import { FETCH_USER, UPDATE_USER, FETCH_USERS }  from '../actions/types';

const initialSate = {
    list: [],
    single: {}
}

export default function(state = initialSate, action) {
    // console.log('action',action);
    switch(action.type) {
        case FETCH_USERS: 
            return {
                ...state,
                list: action.payload
            } 
        case UPDATE_USER: 
            return {
                ...state,
                each: action.payload
            }
        case FETCH_USER: 
            return {
                ...state,
                each: action.payload
            }
        default:
            return state;
    }
}