import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import AuthProvider from '../AuthProvider';
import Login from './index';
import QUERY_USERS from '../graphql/queries';
import { HOME_PATH, LOGIN_PATH } from '../paths';

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
];

describe('Login page', () => {
  let testPathname;
  const setup = () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthProvider>
          <Router initialEntries={[LOGIN_PATH]}>
            <Switch>
              <Route
                exact
                path={HOME_PATH}
                component={({ location }) => {
                  testPathname = location.pathname;
                  return (<div>Home</div>);
                }}
              />
              <Route path={LOGIN_PATH} component={Login} />
            </Switch>
          </Router>
        </AuthProvider>
      </MockedProvider>,
    );
    const [loginButton] = screen.getAllByRole('button');
    const usernameField = screen.getByLabelText('Username');
    const passwordField = screen.getByLabelText('Password');
    return { loginButton, usernameField, passwordField };
  };

  it('renders the login page', () => {
    const { loginButton } = setup();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByText('Register Now')).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it('updates fields with user input', () => {
    const { usernameField, passwordField } = setup();
    userEvent.type(usernameField, 'User');
    userEvent.type(passwordField, 'password');
    expect(screen.getByDisplayValue('User')).toBeInTheDocument();
    expect(screen.getByDisplayValue('password')).toBeInTheDocument();
  });

  it('displays an error when a field is empty', async () => {
    const { usernameField, passwordField } = setup();
    userEvent.type(usernameField, ' {backspace}');
    userEvent.type(passwordField, ' {backspace}');
    expect(await screen.findByText('Username required.')).toBeInTheDocument();
    expect(await screen.findByText('Password required.')).toBeInTheDocument();
  });

  it('enables the login button when fields are filled', () => {
    const { usernameField, passwordField, loginButton } = setup();
    userEvent.type(usernameField, 'User');
    userEvent.type(passwordField, 'password');
    expect(loginButton).toBeEnabled();
  });

  it('displays an error for incorrect credentials', async () => {
    const { usernameField, passwordField, loginButton } = setup();
    userEvent.type(usernameField, 'wrong username');
    userEvent.type(passwordField, 'wrong password');
    userEvent.click(loginButton);
    expect(await screen.findByText('Incorrect username or password.')).toBeInTheDocument();
  });

  it('does not save user state in local storage on failed login', async () => {
    const { usernameField, passwordField, loginButton } = setup();
    userEvent.type(usernameField, 'wrong username');
    userEvent.type(passwordField, 'wrong password');
    userEvent.click(loginButton);
    expect(await screen.findByText('Incorrect username or password.')).toBeInTheDocument();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('does not redirect to home path on failed login', async () => {
    const { usernameField, passwordField, loginButton } = setup();
    userEvent.type(usernameField, 'wrong username');
    userEvent.type(passwordField, 'wrong password');
    userEvent.click(loginButton);
    expect(await screen.findByText('Incorrect username or password.')).toBeInTheDocument();
    expect(testPathname).not.toBe(HOME_PATH);
  });

  it('redirects to home path on successful login', async () => {
    const { usernameField, passwordField, loginButton } = setup();
    userEvent.type(usernameField, 'User');
    userEvent.type(passwordField, 'password');
    userEvent.click(loginButton);
    expect(await screen.findByText('Home')).toBeInTheDocument();
    expect(testPathname).toBe(HOME_PATH);
  });

  it('saves user state in local storage on successful login', () => {
    const { usernameField, passwordField, loginButton } = setup();
    userEvent.type(usernameField, 'User');
    userEvent.type(passwordField, 'password');
    userEvent.click(loginButton);
    expect(localStorage.getItem('user')).toEqual('1');
  });
});
