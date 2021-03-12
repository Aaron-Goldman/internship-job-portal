import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import apolloClient from './apollo';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import AuthProvider from './AuthProvider';
import {
  HOME_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  NOT_FOUND_PATH,
} from './paths';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute
              exact
              path={HOME_PATH}
              component={Home}
            />
            <Route path={LOGIN_PATH} component={Login} />
            <Route path={REGISTER_PATH} component={Register} />
            <Route path={NOT_FOUND_PATH} component={NotFound} />
          </Switch>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
