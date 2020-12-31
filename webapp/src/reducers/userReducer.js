import {
    CREATE_USER, GET_USERS, GET_USER, UPDATE_USER,DELETE_USER, USER_ACTION_PERFORMED
} from '../config/actionNames';
const initialState = {
    user: {},
    users: [],
    userActionPerformed: false,
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
        case CREATE_USER:
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                userActionPerformed: true
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case USER_ACTION_PERFORMED:
            return {
                ...state,
                userActionPerformed: false,
            }
        case DELETE_USER:
        default:
            return state;
    }
};
export default reducer;