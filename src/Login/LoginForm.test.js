import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

it('renders the login form', () => {
  const onUsernameChange = jest.fn();
  const onPasswordChange = jest.fn();
  const onSubmit = jest.fn();
  render(
    <LoginForm
      username=""
      onUsernameChange={onUsernameChange}
      usernameError=""
      password=""
      onPasswordChange={onPasswordChange}
      passwordError=""
      onSubmit={onSubmit}
    />,
  );
  userEvent.type(screen.getByLabelText('Username'), 'User');
  expect(onUsernameChange).toHaveBeenCalledTimes(4);

  userEvent.type(screen.getByLabelText('Password'), 'password');
  expect(onPasswordChange).toHaveBeenCalledTimes(8);

  fireEvent.submit(screen.getByRole('form'));
  expect(onSubmit).toHaveBeenCalled();
});
