import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { isApolloError } from '@apollo/client';
import useAuth, { AuthProvider } from './use-auth';
import QUERY_USERS from './graphql/queries';
import REGISTER from './graphql/mutations';

function TestComponent() {
  const auth = useAuth();
  const [error, setError] = useState('');
  const signIn = async (username) => {
    try {
      await auth.signIn(username, 'password');
    } catch (e) {
      if (isApolloError(e)) { throw e; }
      setError(e.message);
    }
  };
  const signInWithoutUsername = () => signIn('');
  const signInWithUsername = () => signIn('User');
  const signOut = () => auth.signOut();
  const register = async () => {
    try {
      await auth.register('NewUser', 'John', 'Smith', 'password');
      setError('Success');
    } catch (e) {
      if (isApolloError(e)) { throw e; }
      setError(e.message);
    }
  };

  return (
    <div>
      <button type="button" onClick={signInWithoutUsername}>Sign In Without Username</button>
      <button type="button" onClick={signInWithUsername}>Sign In With Username</button>
      <button type="button" onClick={signOut}>Sign Out</button>
      <button type="button" onClick={register}>Register</button>
      <div>{auth.user ? 'Signed In' : 'Signed Out'}</div>
      <div>{error}</div>
    </div>
  );
}

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
      username: 'NewUser',
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
  mockedRegisterResponse,
  {
    request: { query: QUERY_USERS },
    result: {
      data: {
        users: [
          {
            username: 'NewUser',
            password: 'password',
            id: 1,
          },
        ],
      },
    },
  },
  mockedUsersResponse,
  mockedUsersResponse,
  mockedUsersResponse,
];

it('tracks authentication state', async () => {
  localStorage.removeItem('user');
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    </MockedProvider>,
  );
  fireEvent.click(screen.getByText('Register'));
  expect(await screen.findByText('Success')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Register'));
  expect(await screen.findByText('Username taken.')).toBeInTheDocument();

  expect(await screen.findByText('Signed Out')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Sign In Without Username'));
  expect(await screen.findByText('Username required.')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Sign In With Username'));
  expect(await screen.findByText('Signed In')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Sign Out'));
  expect(await screen.findByText('Signed Out')).toBeInTheDocument();
});
