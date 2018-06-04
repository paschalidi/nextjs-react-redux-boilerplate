import { actionTypes as t } from './actionTypes';

export const initRestaurants = (restaurants) => ({
  type: t.INIT_RESTAURANTS,
  payload: { restaurants }
});


