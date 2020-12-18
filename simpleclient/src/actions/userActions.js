import axios from 'axios';
import { CREATE_USER, GET_USERS, GET_USER, UPDATE_USER } from '../config/actionNames';
import { api } from '../config/env';
import { toast } from 'react-toastify';
const PATH = `${api}api/users`;
export function getUsers() {
    return dispatch => {
        axios
            .get(`${PATH}`)
            .then(response => {
                dispatch({ type: GET_USERS, payload: response.data });
            })
            .catch(err => {
            });
    };
}
export function getUser(id) {
    return dispatch => {
        axios
            .get(`${PATH}/${id}`)
            .then(response => {
                dispatch({ type: GET_USER, payload: response.data });
            })
            .catch(err => {
            });
    };
}
export function addUser(payload) {
    return dispatch => {
        axios
            .post(`${PATH}`, payload)
            .then(response => {
                dispatch({ type: CREATE_USER, payload: response.data });
                toast.success('User created Successfully')
            })
            .catch(err => {
            });
    };
}
export function updateUser(id, payload) {
    return dispatch => {
        axios
            .put(`${PATH}/${id}`, payload)
            .then(response => {
                dispatch({ type: UPDATE_USER, payload: response.data });
                toast.success('User updated Successfully')
            })
            .catch(err => {
            });
    };
}
