import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route, MemoryRouter as Router, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './apollo';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Login from './Login';
import { HOME_PATH, LOGIN_PATH } from './paths';
import { AuthProvider } from './use-auth';

function TestApp() {
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
          </Switch>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

it('displays the private page when logged in', () => {
  localStorage.setItem('user', '1');
  render(
    <TestApp />,
  );
  expect(screen.getByText('Home')).toBeInTheDocument();
});
it('redirects to the login page when not logged in', async () => {
  localStorage.removeItem('user');
  render(
    <TestApp />,
  );
  expect(await screen.findByRole('form')).toBeInTheDocument();
});
