import {
    CREATE_USER, GET_USERS, GET_USER, UPDATE_USER
} from '../config/actionNames';
const initialState = {
    user: {},
    users: [],
    userAdded: false
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
            }
        case CREATE_USER:
            return {
                ...state,
                user: action.payload,
                userAdded: true
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        default:
            return state;
    }
};
export default reducer;