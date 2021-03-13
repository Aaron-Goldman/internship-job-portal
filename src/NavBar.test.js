import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import AuthProvider from './AuthProvider';
import NavBar from './NavBar';

function TestApp() {
  return (
    <MockedProvider>
      <AuthProvider>
        <Router>
          <NavBar />
        </Router>
      </AuthProvider>
    </MockedProvider>
  );
}

it('displays the sign out button when logged in', () => {
  localStorage.setItem('user', '1');
  render(
    <TestApp />,
  );
  expect(screen.getByText('Sign Out')).toBeInTheDocument();
});
it('does not display the sign out button when logged out', () => {
  localStorage.removeItem('user');
  render(
    <TestApp />,
  );
  expect(screen.queryByText('Sign Out')).not.toBeInTheDocument();
});
