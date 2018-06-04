import { actionTypes as t } from './actionTypes';
import * as R from 'ramda';


const INITIAL_STATE = {};
// REDUCERS
export const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case t.INIT_RESTAURANTS:

      return { ...state };

    default:
      return state;
  }
};

