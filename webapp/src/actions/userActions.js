import axios from 'axios';
import { CREATE_USER, GET_USERS, GET_USER, UPDATE_USER, DELETE_USER, USER_ACTION_PERFORMED } from '../config/actionNames';
import { api } from '../config/env';
import { toast } from 'react-toastify';
const PATH = `${api}api/users`;
function userActionPerformed(dispatch) {
	setTimeout(() => {
		dispatch({ type: USER_ACTION_PERFORMED });
	}, 500)
}
export function getUsers(offset, limit, SEARCH) {
	return dispatch => {
		axios
			.get(`${PATH}`, {
				params: {
					...SEARCH,
					offset,
					limit,
				}
			})
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
				toast.success('User created Successfully');
				dispatch({ type: CREATE_USER, payload: response.data });
				userActionPerformed(dispatch);
			})
			.catch(err => {
				toast.error('Unable to create User')
			});
	};
}
export function updateUser(id, payload) {
	return dispatch => {
		axios
			.put(`${PATH}/${id}`, payload)
			.then(response => {
				toast.success('User updated Successfully');
				dispatch({ type: UPDATE_USER, payload: response.data });
				userActionPerformed(dispatch);
			})
			.catch(err => {
				toast.error('Unable to create User')
			});
	};
}

export function deleteUser(id) {
	return dispatch => {
		axios
			.delete(`${PATH}/${id}`)
			.then(response => {
				toast.success('User deleted Successfully');
				dispatch({ type: DELETE_USER, payload: response.data });
				dispatch(getUsers());
				userActionPerformed(dispatch);
			})
			.catch(err => {
			});
	};
}
