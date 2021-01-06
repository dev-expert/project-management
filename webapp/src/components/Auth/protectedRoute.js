import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import access from '../../config/access';
import { getRouteName } from '../../config/helper';
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const ROUTE_NAME = getRouteName(rest.path);
    return (<Route {...rest} render={(props) => access(rest.action||'read', ROUTE_NAME) ? <Component {...props} /> : <Redirect from="*" to="/" /> }/>)
}
export default ProtectedRoute;