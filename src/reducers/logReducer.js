import { FETCH_LOGS }  from '../actions/types';

const initialSate = {
    items: [],
    item: {}
}

export default function(state = initialSate, action) {
    // console.log('action',action);
    switch(action.type) {
        case FETCH_LOGS: 
            return {
                ...state,
                items: action.payload
            }
        // case VIEW_LOG: 
        //     return {
        //         ...state,
        //         item: action.payload
        //     }
        default:
            return state;
    }
}