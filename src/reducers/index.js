import { combineReducers } from 'redux';
import postReducer from './postReducer';
import hookReducer from './hookReducer';
import logReducer from './logReducer';

export default combineReducers({
    posts: postReducer,
    hooks: hookReducer,
    logs: logReducer
}) 

