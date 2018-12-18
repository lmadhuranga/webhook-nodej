import { FETCH_USER }  from './types';
import axios from 'axios'
import { appConfig } from '../config/globel.conf'
const url = `${ appConfig.app.url }`;

export const fetchCurrentUser = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`${url}/auth/me`);
            dispatch({ type:FETCH_USER, payload: data });
            return data;
        } catch (error) {
            // dispatch({ type: ERROR_GENERATED, error });
            return {error:error};
        }
    }
}