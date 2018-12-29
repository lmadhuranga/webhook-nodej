import { combineReducers } from 'redux';
import userReducer from './userReducer';
import hookReducer from './hookReducer';
import logReducer from './logReducer';
import authReducer from './authReducer';

export default combineReducers({
    hooks: hookReducer,
    logs: logReducer,
    users: userReducer,
    auth: authReducer
}) 

