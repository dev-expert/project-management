import {
    LOGIN, LOGOUT,
    SET_LOADER, RESET_LOADER, SIGNUP
} from '../config/actionNames';
const initialState = {
    showLoader: false,
    isLoggedIn: localStorage.getItem('authToken') || false,
    signUp: false
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
            }
        case SIGNUP:
            return {
                ...state,
                signUp: true,
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
            }
        case SET_LOADER:
            return {
                ...state,
                showLoader: true
            }
        case RESET_LOADER:
            return {
                ...state,
                showLoader: false
            };
        default:
            return state;
    }
};
export default reducer;