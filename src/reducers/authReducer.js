import { FETCH_USER }  from '../actions/types';

const initialSate = null;

export default function(state = initialSate, action) {
    // console.log('action',action);
    switch(action.type) {
        case FETCH_USER: 
            return action.payload || false;
        default:
            return state;
    }
}