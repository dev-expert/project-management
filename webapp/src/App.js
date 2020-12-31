import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import appStore from './config/store';
import Login from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Home from './components/Common/Home';
import Projects from './components/Project/Projects';
import CreateProject from './components/Project/CreateProject';
import Users from './components/User/Users';
import TimeSheet from './components/Task/TimeSheet';
import TimeSheetUI from './components/timesheet'
import CreateUser from './components/User/CreateUser';
import editUser from './components/User/EditUser';
import Drawer from './components/Layouts/Drawer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import ProtectedRoute from './components/Auth/protectedRoute';
function App() {
  return (
    <Provider store={appStore}>
      <MuiThemeProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
        <Drawer>
          <ToastContainer/>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/home" exact component={Home} />
            <ProtectedRoute action='write' path="/projects/create" exact component={CreateProject} />
            <ProtectedRoute path="/projects" exact component={Projects} />
            <ProtectedRoute action='write' path="/users/create" exact component={CreateUser} />
            <ProtectedRoute action='write' path="/users/edit" exact component={editUser} />
            <ProtectedRoute path="/users" exact component={Users} />
            <ProtectedRoute path="/timesheet" exact component={TimeSheet} />
            <Route path="/timesheet-ui" exact component={TimeSheetUI} />
            <Redirect from="*" to="/" />
          </Switch>
        </Drawer>
        </Router>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
