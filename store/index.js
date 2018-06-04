import { combineReducers } from 'redux';
import { reducer } from './app-store/reducer';


const rootReducer = combineReducers({ app: reducer });
export default rootReducer;