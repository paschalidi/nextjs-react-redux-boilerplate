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

export const sortByRatingDesc = () => ({
  type: t.SORT_BY_RATING_DESC
});
export const sortByRatingAsc = () => ({
  type: t.SORT_BY_RATING_ASC
});

export const sortByNameDesc = () => ({
  type: t.SORT_BY_NAME_DESC
});
export const sortByNameAsc = () => ({
  type: t.SORT_BY_NAME_ASC
});

export const toggleOnlineNow = () => ({
  type: t.TOGGLE_ONLINE_NOW
});

export const toggleReachableNow = () => ({
  type: t.TOGGLE_REACHABLE_NOW
});

export const filterByCategory = (categoryName) => ({
  type: t.FILTER_BY_CATEGORY,
  payload: { categoryName }
});

