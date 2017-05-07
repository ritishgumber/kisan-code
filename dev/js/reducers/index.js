import {combineReducers} from 'redux';
import DataReducer from './reducer-docs';

const allReducers = combineReducers({data: DataReducer});

export default allReducers
