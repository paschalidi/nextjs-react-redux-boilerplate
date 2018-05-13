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

    default:
      return state;
  }
};

