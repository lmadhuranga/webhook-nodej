import { FETCH_POSTS, NEW_POST, VIEW_POST, UPDATE_POST }  from '../actions/types';

const initialSate = {
    items: [],
    item: {}
}

export default function(state = initialSate, action) {
    console.log('action',action.payload);
    switch(action.type) {
        case FETCH_POSTS: 
            return {
                ...state,
                items: action.payload
            }
        case NEW_POST: 
            return {
                ...state,
                item: action.payload
            }
        case UPDATE_POST: 
            return {
                ...state,
                item: action.payload
            }
        case VIEW_POST: 
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}