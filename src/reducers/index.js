import { combineReducers } from 'redux';
import postReducer from './postReducer';
import hookReducer from './hookReducer';

export default combineReducers({
    posts: postReducer,
    hooks: hookReducer
}) 

