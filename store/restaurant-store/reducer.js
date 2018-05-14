import { actionTypes as t } from './actionTypes';
import * as R from 'ramda';
import { filterPipe } from '../../utils/filter-pipe';
import { getArrayFromSplit } from '../../utils/string-manipulators';


const ITEMS_PER_PAGE = 10;
const INITIAL_STATE = {
  activePage: 0,
  startIndex: 0,
  endIndex: 9,
  itemsPerPage: ITEMS_PER_PAGE,
  isRatingDesc: undefined,
  isNameDesc: undefined,
  isOnlineNow: true,
  isReachableNow: true,
  activeCategoryFilterName: null,
  allCategories: []
};

const getTotalPages = (totalItems) => Math.ceil(totalItems / ITEMS_PER_PAGE);

// REDUCERS
export const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case t.INIT_RESTAURANTS:
      const entries = payload.restaurants.data;
      let updatedData = Object.keys(entries).map(index => {
        const categoriesArray = getArrayFromSplit(entries[index].general.categories[0], ',');
        return R.assoc('categoriesArray', categoriesArray, entries[index]);
      });

      return {
        ...state,
        data: updatedData,
        initialData: updatedData,
        totalItems: payload.restaurants.pagination.total_items,
        totalPages: getTotalPages(payload.restaurants.pagination.total_items),
        activeCategoryFilterName: null
      };

    case t.INIT_CATEGORIES:
      const allCategoriesList = Object.keys(state.data).map(index => getArrayFromSplit(state.data[index].general.categories[0], ','));
      const mergedCategories = [].concat.apply([], allCategoriesList);
      const uniqCategories = R.uniq(mergedCategories);
      return {
        ...state,
        allCategories: uniqCategories
      };

    case t.SELECT_PAGE:
      let startIndex, endIndex;
      if (state.activePage !== payload.page) {
        startIndex = ITEMS_PER_PAGE * payload.page;
        endIndex = ITEMS_PER_PAGE * payload.page + 9;
      } else {
        startIndex = state.startIndex;
        endIndex = state.endIndex;
      }
      return {
        ...state,
        activePage: payload.page,
        startIndex,
        endIndex
      };

    case t.SORT_BY_RATING_DESC:
      let byRatingDesc = R.descend(R.path(['rating', 'average']));
      let data = R.sort(byRatingDesc, state.data);
      return {
        ...state,
        data,
        isRatingDesc: true,
        isNameDesc: INITIAL_STATE.isNameDesc,
        isOrderPriceDesc: INITIAL_STATE.isOrderPriceDesc

      };

    case t.SORT_BY_RATING_ASC:
      let byRatingASc = R.ascend(R.path(['rating', 'average']));
      data = R.sort(byRatingASc, state.data);
      return {
        ...state,
        data,
        isRatingDesc: false,
        isNameDesc: INITIAL_STATE.isNameDesc,
        isOrderPriceDesc: INITIAL_STATE.isOrderPriceDesc

      };

    case t.SORT_BY_NAME_DESC:
      let byNameDesc = R.descend(R.path(['general', 'name']));
      data = R.sort(byNameDesc, state.data);
      return {
        ...state,
        data,
        isNameDesc: true,
        isRatingDesc: INITIAL_STATE.isRatingDesc,
        isOrderPriceDesc: INITIAL_STATE.isOrderPriceDesc

      };

    case t.SORT_BY_NAME_ASC:
      let byNameASc = R.ascend(R.path(['general', 'name']));
      data = R.sort(byNameASc, state.data);
      return {
        ...state,
        data,
        isNameDesc: false,
        isRatingDesc: INITIAL_STATE.isRatingDesc,
        isOrderPriceDesc: INITIAL_STATE.isOrderPriceDesc
      };

    case t.TOGGLE_ONLINE_NOW:
      let nextData = filterPipe({
        initialData: state.initialData,
        isOnlineNow: !state.isOnlineNow
      });
      return {
        ...state,
        data: filterPipe({
          initialData: state.initialData,
          isOnlineNow: !state.isOnlineNow
        }),
        isOnlineNow: !state.isOnlineNow,
        totalPages: getTotalPages(Object.keys(nextData).length),
        totalItems: Object.keys(nextData).length,
        activePage: INITIAL_STATE.activePage,
        startIndex: INITIAL_STATE.startIndex,
        endIndex: INITIAL_STATE.endIndex

      };

    case t.TOGGLE_REACHABLE_NOW:
      nextData = filterPipe({
        initialData: state.initialData,
        isReachableNow: !state.isReachableNow
      });
      return {
        ...state,
        data: nextData,
        isReachableNow: !state.isReachableNow,
        totalPages: getTotalPages(Object.keys(nextData).length),
        totalItems: Object.keys(nextData).length,
        activePage: INITIAL_STATE.activePage,
        startIndex: INITIAL_STATE.startIndex,
        endIndex: INITIAL_STATE.endIndex
      };

    case t.FILTER_BY_CATEGORY:
      nextData = filterPipe({
        initialData: state.initialData,
        categoryName: payload.categoryName
      });

      return {
        ...state,
        activeCategoryFilterName: payload.categoryName,
        data: nextData,
        totalPages: getTotalPages(Object.keys(nextData).length),
        totalItems: Object.keys(nextData).length,
        activePage: INITIAL_STATE.activePage,
        startIndex: INITIAL_STATE.startIndex,
        endIndex: INITIAL_STATE.endIndex,
        isOnlineNow: true,
        isReachableNow: true
      };

    default:
      return state;
  }
};

