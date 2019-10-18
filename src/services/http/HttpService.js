import axios from 'axios';
import { BACKEND_URL } from '../api';


function getHeaders() {
    return {
        accept: 'application/json',
        // authorization: `JWT ${getStoredAuthToken()}`,
    };
}

function postHeaders() {
    return {
        'content-type': 'application/json',
        // authorization: `JWT ${getStoredAuthToken()}`,
    };
}

export const postRequest = (endpoint, data) => axios
    .post(BACKEND_URL + endpoint, data, { headers: postHeaders() })
    .then(res => res.data)
    .catch((err) => {
        throw err;
    });

export const putRequest = (endpoint, data) => axios
    .put(BACKEND_URL + endpoint, data, { headers: postHeaders() })
    .then(res => res.data)
    .catch((err) => {
        throw err;
    });

export const deleteRequest = (endpoint, data) => axios
    .delete(BACKEND_URL + endpoint, { headers: postHeaders(), data })
    .then(res => res.data)
    .catch((err) => {
        throw err;
    });

export const getRequest = endpoint => axios
    .get(BACKEND_URL + endpoint, { headers: getHeaders() })
    .then(res => res.data)
    .catch((err) => {
        throw err;
    });
