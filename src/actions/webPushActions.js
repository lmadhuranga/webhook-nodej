import { FETCH_LOGS }  from './types';
import { ERROR_GENERATED }  from './types';
import axios from 'axios'
import { appConfig } from '../config/globel.conf'
const url = appConfig.app.url;

export const updateSubscribe = async (formData) => {
    console.log('updateSubscribe', formData);     
        try {
            console.log('11 line');
            const { data } = await axios.post(`${url}/users/subscribe`,formData);
            console.log('data',data);
            // dispatch({ type:FETCH_LOGS, payload: data });
            // dispatch({ type: ERROR_GENERATED, data });
            return data;
        } catch (error) {
            console.log('error',error);
            // dispatch({ type: ERROR_GENERATED, error });
            // return {error:error};
        }
}