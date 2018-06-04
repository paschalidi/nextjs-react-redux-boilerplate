import { actionTypes as t } from './actionTypes';
import * as R from 'ramda';



const INITIAL_STATE = {}
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

    default:
      return state;
  }
};

