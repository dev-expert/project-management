import { combineReducers } from 'redux';
import AppReducer from './appReducer';
import UserReducer from './userReducer';
import ProjectReducer from './projectReducer';
import { reducer as form } from 'redux-form';

export default combineReducers({
    AppReducer,
    UserReducer,
    ProjectReducer,
    form
});