import { FETCH_LOGS }  from './types';
// import { ERROR_GENERATED }  from './types';
import axios from 'axios'
import { appConfig } from '../config/globel.conf'
const url = appConfig.app.url;

export const fetchLogs = (token) => {
    return async dispatch => {       
        try {
            const { data } = await axios.get(`${url}/logs/token/${token}`);
            dispatch({ type:FETCH_LOGS, payload: data });
            return data;
        } catch (error) {
            // dispatch({ type: ERROR_GENERATED, error });
            return {error:error};
        }
    }
}