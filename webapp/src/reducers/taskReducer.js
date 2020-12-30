import {
    CREATE_TASK, GET_TASKS, GET_TASK, UPDATE_TASK
} from '../config/actionNames';
const initialState = {
    task: {},
    tasks: [],
    taskAdded: false,
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASK:
        case UPDATE_TASK:
            return {
                ...state,
                task: action.payload,
            }
        case CREATE_TASK:
            return {
                ...state,
                task: action.payload,
                taskAdded: true
            }
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            }
        default:
            return state;
    }
};
export default reducer;