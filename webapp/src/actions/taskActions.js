import axios from 'axios';
import { CREATE_TASK, GET_TASKS, GET_TASK, UPDATE_TASK, DELETE_TASK } from '../config/actionNames';
import { api } from '../config/env';
import { toast } from 'react-toastify';
const PATH = `${api}api/tasks`;
export function getTasks(params) {
    return dispatch => {
        axios
            .get(`${PATH}`, { params })
            .then(response => {
                dispatch({ type: GET_TASKS, payload: response.data });
            })
            .catch(err => {
            });
    };
}
export function getTask(id) {
    return dispatch => {
        axios
            .get(`${PATH}/${id}`)
            .then(response => {
                dispatch({ type: GET_TASK, payload: response.data });
            })
            .catch(err => {
            });
    };
}
export function addTask(payload) {
    return dispatch => {
        axios
            .post(`${PATH}`, payload)
            .then(response => {
                dispatch({ type: CREATE_TASK, payload: response.data });
                toast.success('Task created Successfully')
            })
            .catch(err => {
            });
    };
}
export function updateTask(id, payload) {
    return dispatch => {
        axios
            .put(`${PATH}/${id}`, payload)
            .then(response => {
                dispatch({ type: UPDATE_TASK, payload: response.data });
                toast.success('Task updated Successfully')
            })
            .catch(err => {
            });
    };
}
export function deleteTask(id) {
    return dispatch => {
        axios
            .delete(`${PATH}/${id}`)
            .then(response => {
                dispatch({ type: DELETE_TASK, payload: response.data });
                dispatch(getTasks());
                toast.success('Task deleted Successfully')
            })
            .catch(err => {
            });
    };
}
