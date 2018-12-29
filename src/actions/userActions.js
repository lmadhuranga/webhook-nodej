import { FETCH_USER, UPDATE_USER, FETCH_USERAUTH  }  from './types';
import axios from 'axios'
import { appConfig } from '../config/globel.conf'
const url = `${ appConfig.app.url }`;
const apiUrl = `${ appConfig.app.api }`;

export const fetchCurrentUser = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`${url}/auth/me`);
            dispatch({ type:FETCH_USERAUTH, payload: data });
            return data;
        } catch (error) {
            // dispatch({ type: ERROR_GENERATED, error });
            return {error:error};
        }
    }
}


export const updateUser = (formData, userId) => { 
    return async dispatch => {       
        try {
            const { data } = await axios.put(`${apiUrl}/users/${userId}`, formData);
            dispatch({ type:UPDATE_USER, payload: data });
            return data;
        } catch (error) {
            // dispatch({ type: ERROR_GENERATED, error });
            return {error:error};
        }
    }
} 
export const fetchUser = (userId) => { 
    return async dispatch => {       
        try {
            console.log('${apiUrl}/users/${userId}',`${apiUrl}/users/${userId}`);
            const { data } = await axios.get(`${apiUrl}/users/${userId}`);
            dispatch({ type:FETCH_USER, payload: data });
            return data;
        } catch (error) {
            // dispatch({ type: ERROR_GENERATED, error });
            return {error:error};
        }
    }
}