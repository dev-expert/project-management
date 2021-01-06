import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import appStore from './config/store';
import Login from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Home from './components/Common/Home';
import Projects from './components/Project/Projects';
import EditProject from './components/Project/EditProject';

import CreateProject from './components/Project/CreateProject';
import Users from './components/User/Users';
import TimeSheet from './components/Timesheet'
import Reports from './components/Reports'
import CreateUser from './components/User/CreateUser';
import editUser from './components/User/EditUser';
import Drawer from './components/Layouts/Drawer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { orange } from '@material-ui/core/colors';

import ProtectedRoute from './components/Auth/protectedRoute';
const theme = createMuiTheme({
  status: {
    danger: orange[500],
  },
});
function App() {
  return (
    <Provider store={appStore}>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router>
        <Drawer>
          <ToastContainer/>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/home" exact component={Home} />
            <ProtectedRoute action='write' path="/projects/create" exact component={CreateProject} />
            <ProtectedRoute action='write' path="/project/edit" exact component={EditProject} />
            <ProtectedRoute path="/projects" exact component={Projects} />
            <ProtectedRoute action='write' path="/users/create" exact component={CreateUser} />
            <ProtectedRoute action='write' path="/users/edit" exact component={editUser} />
            <ProtectedRoute path="/users" exact component={Users} />
            <ProtectedRoute path="/timesheet" exact component={TimeSheet} />
            <ProtectedRoute path="/reports" exact component={Reports} />
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
