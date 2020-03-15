import { combineReducers } from 'redux';

import pagination from './pagination';
import login from './login';
import lastAction  from './lastAction';

export default combineReducers({
    pagination, login, lastAction
});