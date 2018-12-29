import { FETCH_USERAUTH }  from '../actions/types';

const initialSate = null;

export default function(state = initialSate, action) {
    // console.log('action',action);
    switch(action.type) {
        case FETCH_USERAUTH: 
            return action.payload || false;
        default:
            return state;
    }
}