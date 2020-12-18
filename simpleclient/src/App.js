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
import Drawer from './components/Drawer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Provider store={appStore}>
      <MuiThemeProvider>
        <Router>
        <Drawer>
          <ToastContainer/>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/home" exact component={Home} />
            <Route path="/projects/create" exact component={CreateProject} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/users" exact component={Users} />
            <Redirect from="*" to="/" />
          </Switch>
        </Drawer>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
