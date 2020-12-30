import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import appStore from './config/store';
import Login from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Projects from './components/Projects';
import CreateProject from './components/CreateProject';
import Users from './components/Users';
import TimeSheet from './components/TimeSheet';

import CreateUser from './components/CreateUser';
import Drawer from './components/Drawer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
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
            <Route path="/projects/create" exact component={CreateProject} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/users/create" exact component={CreateUser} />
            <Route path="/users" exact component={Users} />
            <Route path="/timesheet" exact component={TimeSheet} />

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
