import { FETCH_HOOKS, VIEW_HOOK, UPDATE_HOOK }  from './types';
import axios from 'axios'
import { appConfig } from '../config/globel.conf'
const url = `${ appConfig.app.api }`;

export const fetchHooks = (userId) => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`${url}/hooks/user/${userId}`);
            dispatch({ type:FETCH_HOOKS, payload: data });
            return data;
        } catch (error) {
            // dispatch({ type: ERROR_GENERATED, error });
            return {error:error};
        }
    }
}

export const fetchHook = (id) => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`${url}/hooks/${id}`);
            dispatch({ type:VIEW_HOOK, payload: data });
            return data;
        } catch (error) {
            // dispatch({ type: ERROR_GENERATED, error });
            return {error:error};
        }
    }
}

export const updateHook = (formData, hookId) => { 
    return async dispatch => {       
        try {
            const hook = await axios.put(`${url}/hooks/${hookId}`, formData);
            dispatch({ type:UPDATE_HOOK, payload: hook });
            return hook;
        } catch (error) {
            // dispatch({ type: ERROR_GENERATED, error });
            return {error:error};
        }
    }
}