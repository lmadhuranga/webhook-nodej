import { FETCH_HOOKS, VIEW_HOOK, UPDATE_HOOK }  from '../actions/types';

const initialSate = {
    items: [],
    item: {}
}

export default function(state = initialSate, action) {
    // console.log('action',action);
    switch(action.type) {
        case FETCH_HOOKS: 
            return {
                ...state,
                items: action.payload
            }
        // case NEW_HOOK: 
        //     return {
        //         ...state,
        //         item: action.payload
        //     }
        case UPDATE_HOOK: 
            return {
                ...state,
                item: action.payload
            }
        case VIEW_HOOK: 
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}