import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import AuthProvider from '../AuthProvider';
import Register from './index';
import QUERY_USERS from '../graphql/queries';
import REGISTER from '../graphql/mutations';
import { HOME_PATH, REGISTER_PATH } from '../paths';

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

const mockedRegisterResponse = {
  request: {
    query: REGISTER,
    variables: {
      username: 'User_',
      firstName: 'John',
      lastName: 'Smith',
      password: 'password',
    },
  },
  result: {
    data: {
      id: 1,
    },
  },
};

const mocks = [
  mockedUsersResponse,
  mockedUsersResponse,
  mockedUsersResponse,
  mockedRegisterResponse,
];

it('renders the register page', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthProvider>
        <Router initialEntries={[REGISTER_PATH]}>
          <Switch>
            <Route
              exact
              path={HOME_PATH}
              component={() => <div>Home</div>}
            />
            <Route path={REGISTER_PATH} component={Register} />
          </Switch>
        </Router>
      </AuthProvider>
    </MockedProvider>,
  );

  expect(await screen.findByRole('form')).toBeInTheDocument();

  const usernameField = screen.getByLabelText('Username');
  userEvent.type(usernameField, ' {backspace}');
  expect(await screen.findByText('Username required.')).toBeInTheDocument();
  userEvent.type(usernameField, 'User');
  expect(screen.getByDisplayValue('User')).toBeInTheDocument();

  const firstNameField = screen.getByLabelText('First Name');
  userEvent.type(firstNameField, ' {backspace}');
  expect(await screen.findByText('First name required.')).toBeInTheDocument();
  userEvent.type(firstNameField, 'John');
  expect(screen.getByDisplayValue('John')).toBeInTheDocument();

  const lastNameField = screen.getByLabelText('Last Name');
  userEvent.type(lastNameField, ' {backspace}');
  expect(await screen.findByText('Last name required.')).toBeInTheDocument();
  userEvent.type(lastNameField, 'Smith');
  expect(screen.getByDisplayValue('Smith')).toBeInTheDocument();

  const passwordField = screen.getByLabelText('Password');
  userEvent.type(passwordField, ' {backspace}');
  expect(await screen.findByText('Password required.')).toBeInTheDocument();
  userEvent.type(passwordField, 'password');
  expect(screen.getByDisplayValue('password')).toBeInTheDocument();

  userEvent.click(screen.getByRole('button'));
  expect(await screen.findByText('Username taken.')).toBeInTheDocument();
  userEvent.type(usernameField, '_');
  userEvent.click(screen.getByRole('button'));
  expect(await screen.findByText('Home')).toBeInTheDocument();
});
