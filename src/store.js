import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middlewares = [thunk];

const store = createStore(
    rootReducer,    
    initialState,
    compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )

);

export default store;
