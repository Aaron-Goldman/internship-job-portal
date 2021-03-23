import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { HOME_PATH, LOGIN_PATH } from './paths';
import { useAuth } from './AuthProvider';

function PrivateRoute(props) {
  const {
    path,
    exact,
    component,
  } = props;
  const auth = useAuth();
  const isLoggedIn = !!auth.user;

  return (
    isLoggedIn ? (
      <Route path={path} exact={exact} component={component} />
    ) : (
      <Redirect
        to={{
          pathname: LOGIN_PATH,
        }}
      />
    )
  );
}

PrivateRoute.defaultProps = {
  path: HOME_PATH,
  exact: false,
  component: undefined,
};

PrivateRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.func,
};

export default PrivateRoute;
