import axios from 'axios';
import { CREATE_PROJECT, GET_PROJECTS, GET_PROJECT, UPDATE_PROJECT } from '../config/actionNames';
import { api } from '../config/env';
import { toast } from 'react-toastify';
const PATH = `${api}api/projects`;
export function getProjects() {
    return dispatch => {
        axios
            .get(`${PATH}`)
            .then(response => {
                dispatch({ type: GET_PROJECTS, payload: response.data });
            })
            .catch(err => {
            });
    };
}
export function getProject(id) {
    return dispatch => {
        axios
            .get(`${PATH}/${id}`)
            .then(response => {
                dispatch({ type: GET_PROJECT, payload: response.data });
            })
            .catch(err => {
            });
    };
}
export function addProject(payload) {
    return dispatch => {
        axios
            .post(`${PATH}`, payload)
            .then(response => {
                debugger
                dispatch({ type: CREATE_PROJECT, payload: response.data });
                toast.success('Project created Successfully')
            })
            .catch(err => {
            });
    };
}
export function updateProject(id, payload) {
    return dispatch => {
        axios
            .put(`${PATH}/${id}`, payload)
            .then(response => {
                dispatch({ type: UPDATE_PROJECT, payload: response.data });
                toast.success('Project updated Successfully')
            })
            .catch(err => {
            });
    };
}
