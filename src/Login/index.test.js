import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { AuthProvider } from '../use-auth';
import Login from './index';
import QUERY_USERS from '../graphql/queries';

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
];

it('renders the login page', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthProvider>
        <Router>
          <Login />
        </Router>
      </AuthProvider>
    </MockedProvider>,
  );
  expect(screen.getByRole('form')).toBeInTheDocument();
  expect(screen.getByText('Register Now')).toBeInTheDocument();
  const loginButton = screen.getAllByRole('button')[0];
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
  userEvent.type(usernameField, '{backspace}');
  fireEvent.click(loginButton);
  expect(screen.queryByText('Incorrect username or password.')).not.toBeInTheDocument();
});
