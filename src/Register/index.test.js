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

const mocks = [
  {
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
  },
  {
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
  },
];

describe('Register page', () => {
  let testPathname;
  const setup = () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthProvider>
          <Router initialEntries={[REGISTER_PATH]}>
            <Switch>
              <Route
                exact
                path={HOME_PATH}
                component={({ location }) => {
                  testPathname = location.pathname;
                  return (<div>Home</div>);
                }}
              />
              <Route path={REGISTER_PATH} component={Register} />
            </Switch>
          </Router>
        </AuthProvider>
      </MockedProvider>,
    );
    const usernameField = screen.getByLabelText('Username');
    const firstNameField = screen.getByLabelText('First Name');
    const lastNameField = screen.getByLabelText('Last Name');
    const passwordField = screen.getByLabelText('Password');
    const registerButton = screen.getByRole('button');
    return {
      usernameField, firstNameField, lastNameField, passwordField, registerButton,
    };
  };

  it('renders the register page', () => {
    const { registerButton } = setup();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(registerButton).toBeDisabled();
  });

  it('updates fields with user input', () => {
    const {
      usernameField, firstNameField, lastNameField, passwordField,
    } = setup();
    userEvent.type(usernameField, 'User');
    userEvent.type(firstNameField, 'John');
    userEvent.type(lastNameField, 'Smith');
    userEvent.type(passwordField, 'password');
    expect(screen.getByDisplayValue('User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Smith')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password')).toBeInTheDocument();
  });

  it('displays an error when field is empty', async () => {
    const {
      usernameField, firstNameField, lastNameField, passwordField,
    } = setup();
    userEvent.type(usernameField, ' {backspace}');
    expect(await screen.findByText('Username required.')).toBeInTheDocument();
    userEvent.type(firstNameField, ' {backspace}');
    expect(await screen.findByText('First name required.')).toBeInTheDocument();
    userEvent.type(lastNameField, ' {backspace}');
    expect(await screen.findByText('Last name required.')).toBeInTheDocument();
    userEvent.type(passwordField, ' {backspace}');
    expect(await screen.findByText('Password required.')).toBeInTheDocument();
  });

  it('displays an error for duplicate username', async () => {
    const {
      usernameField, firstNameField, lastNameField, passwordField, registerButton,
    } = setup();
    userEvent.type(usernameField, 'User');
    userEvent.type(firstNameField, 'John');
    userEvent.type(lastNameField, 'Smith');
    userEvent.type(passwordField, 'password');
    userEvent.click(registerButton);
    expect(await screen.findByText('Username taken.')).toBeInTheDocument();
  });

  it('does not redirect to home path on failed registration', async () => {
    const {
      usernameField, firstNameField, lastNameField, passwordField, registerButton,
    } = setup();
    userEvent.type(usernameField, 'User');
    userEvent.type(firstNameField, 'John');
    userEvent.type(lastNameField, 'Smith');
    userEvent.type(passwordField, 'password');
    userEvent.click(registerButton);
    expect(await screen.findByText('Username taken.')).toBeInTheDocument();
    expect(testPathname).not.toBe(HOME_PATH);
  });

  it('redirects to home path on successful registration', async () => {
    const {
      usernameField, firstNameField, lastNameField, passwordField, registerButton,
    } = setup();
    userEvent.type(usernameField, 'User_');
    userEvent.type(firstNameField, 'John');
    userEvent.type(lastNameField, 'Smith');
    userEvent.type(passwordField, 'password');
    userEvent.click(registerButton);
    expect(await screen.findByText('Home')).toBeInTheDocument();
    expect(testPathname).toBe(HOME_PATH);
  });
});
