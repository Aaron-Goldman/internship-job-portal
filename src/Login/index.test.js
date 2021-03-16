import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import AuthProvider from '../AuthProvider';
import Login from './index';
import QUERY_USERS from '../graphql/queries';
import { HOME_PATH, LOGIN_PATH } from '../paths';

const mockedUsersResponse = {
  request: { query: QUERY_USERS },
  result: {
    data: {
      users: [
        {
          username: 'User',
          password: 'password',
          id: 1,
        },
      ],
    },
  },
};

const mocks = [
  mockedUsersResponse,
  mockedUsersResponse,
  mockedUsersResponse,
];

it('renders the login page', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthProvider>
        <Router initialEntries={[LOGIN_PATH]}>
          <Switch>
            <Route
              exact
              path={HOME_PATH}
              component={() => <div>Home</div>}
            />
            <Route path={LOGIN_PATH} component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </MockedProvider>,
  );
  expect(screen.getByRole('form')).toBeInTheDocument();
  expect(screen.getByText('Register Now')).toBeInTheDocument();
  const [loginButton] = screen.getAllByRole('button');
  expect(loginButton).toBeDisabled();

  const usernameField = screen.getByLabelText('Username');
  userEvent.type(usernameField, ' {backspace}');
  expect(await screen.findByText('Username required.')).toBeInTheDocument();
  userEvent.type(usernameField, 'User_');
  expect(screen.getByDisplayValue('User_')).toBeInTheDocument();

  const passwordField = screen.getByLabelText('Password');
  userEvent.type(passwordField, ' {backspace}');
  expect(await screen.findByText('Password required.')).toBeInTheDocument();
  userEvent.type(passwordField, 'password');
  expect(screen.getByDisplayValue('password')).toBeInTheDocument();

  expect(loginButton).toBeEnabled();

  fireEvent.click(loginButton);
  expect(await screen.findByText('Incorrect username or password.')).toBeInTheDocument();
  expect(localStorage.getItem('user')).toBeNull();
  userEvent.type(usernameField, '{backspace}');
  fireEvent.click(loginButton);
  expect(await screen.findByText('Home')).toBeInTheDocument();
  expect(localStorage.getItem('user')).toEqual('1');
});
