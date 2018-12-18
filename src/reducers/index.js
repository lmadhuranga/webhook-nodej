import { combineReducers } from 'redux';
import postReducer from './postReducer';
import hookReducer from './hookReducer';
import logReducer from './logReducer';
import authReducer from './authReducer';

export default combineReducers({
    posts: postReducer,
    hooks: hookReducer,
    logs: logReducer,
    auth: authReducer
}) 

