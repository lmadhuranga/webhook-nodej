import { FETCH_POSTS, NEW_POST, VIEW_POST, UPDATE_POST }  from './types';
// import { ERROR_GENERATED }  from './types';
import axios from 'axios'
import { appConfig } from '../config/globel.conf'
const url = appConfig.app.api;

export const fetchPosts = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => dispatch({
        type:FETCH_POSTS,
        payload: posts
    }));
}
export const updateUser = (formData, userId) => { 
    return async dispatch => {       
        try {
            const { data } = await axios.put(`${url}/users/${userId}`, formData);
            dispatch({ type:UPDATE_POST, payload: data });
            return data;
        } catch (error) {
            // dispatch({ type: ERROR_GENERATED, error });
            return {error:error};
        }
    }
}
export const registerUser = (formData) => { 
    return async dispatch => {       
        try {
            const { data } = await axios.post(`${url}/users`, formData);
            dispatch({ type:NEW_POST, payload: data });
            return data;
        } catch (error) {
            // dispatch({ type: ERROR_GENERATED, error });
            return {error:error};
        }
    }
}
export const updatePost = (postId, postData) => dispatch => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(FormData)
    })
    .then(res => res.json())
    .then(post => dispatch({
        type:UPDATE_POST,
        payload: post
    }));
}

export const fetchUser = (userId) => { 
    return async dispatch => {       
        try {
            const { data } = await axios.get(`${url}/users/${userId}`);
            dispatch({ type:VIEW_POST, payload: data });
            return data;
        } catch (error) {
            // dispatch({ type: ERROR_GENERATED, error });
            return {error:error};
        }
    }
}