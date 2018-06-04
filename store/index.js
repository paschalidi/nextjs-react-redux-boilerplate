import { combineReducers } from 'redux';
import { reducer } from './restaurant-store/reducer';


const rootReducer = combineReducers({ restaurants: reducer });
export default rootReducer;