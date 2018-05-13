import { actionTypes as t } from './actionTypes';

export const initRestaurants = (restaurants) => ({
  type: t.INIT_RESTAURANTS,
  payload: { restaurants }
});
export const initCategories = (restaurants) => ({
  type: t.INIT_CATEGORIES,
  payload: { restaurants }
});

export const selectPage = (page) => ({
  type: t.SELECT_PAGE,
  payload: { page }
});
