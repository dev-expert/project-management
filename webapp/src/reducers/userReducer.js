import {
    CREATE_USER, GET_USERS, GET_USER, UPDATE_USER, DELETE_USER, USER_ACTION_PERFORMED, URER_REDIRECT_URI
} from '../config/actionNames';
const initialState = {
    user: {},
    users: [],
    userActionPerformed: false,
    userAdded: false,
    editUser: false,

};
function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_USER: return {
            ...state,
            user: action.payload,
            userActionPerformed: true,
            userAdded: true
        }
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
                editUser: true,
                userActionPerformed:true
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                userAdded: false

            }
        case URER_REDIRECT_URI:
            return {
                ...state,
                editUser: false,
                userAdded: false
            }
        case USER_ACTION_PERFORMED:
            return {
                ...state,
                userActionPerformed: false,
                userAdded: false,
            }
        case DELETE_USER:
        default:
            return state;
    }
};
export default reducer;