import {
    CREATE_PROJECT, GET_PROJECTS, GET_PROJECT, UPDATE_PROJECT
} from '../config/actionNames';
const initialState = {
    project: {},
    projects: [],
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECT:
        case UPDATE_PROJECT:
        case CREATE_PROJECT:
            return {
                ...state,
                project: action.payload,
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
            }
        default:
            return state;
    }
};
export default reducer;