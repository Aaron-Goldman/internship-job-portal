import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';

function RegisterForm(props) {
  const {
    username,
    onUsernameChange,
    usernameError,
    firstName,
    onFirstNameChange,
    firstNameError,
    lastName,
    onLastNameChange,
    lastNameError,
    password,
    onPasswordChange,
    passwordError,
    onSubmit,
    disabled,
  } = props;

  return (
    <form
      aria-label="form"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      onSubmit={onSubmit}
    >
      <TextField
        id="username-field"
        label="Username"
        autoComplete="username"
        value={username}
        onChange={onUsernameChange}
        error={!!usernameError}
        helperText={usernameError}
      />
      <TextField
        id="firstName-field"
        label="First Name"
        autoComplete="given-name"
        value={firstName}
        onChange={onFirstNameChange}
        error={!!firstNameError}
        helperText={firstNameError}
      />
      <TextField
        id="lastName-field"
        label="Last Name"
        autoComplete="family-name"
        value={lastName}
        onChange={onLastNameChange}
        error={!!lastNameError}
        helperText={lastNameError}
      />
      <TextField
        id="password-field"
        label="Password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={onPasswordChange}
        error={!!passwordError}
        helperText={passwordError}
      />
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        disabled={disabled}
        style={{
          margin: '1em',
        }}
      >
        Register
      </Button>
    </form>
  );
}

RegisterForm.defaultProps = {
  usernameError: '',
  firstNameError: '',
  lastNameError: '',
  passwordError: '',
  disabled: false,
};

RegisterForm.propTypes = {
  username: propTypes.string.isRequired,
  onUsernameChange: propTypes.func.isRequired,
  usernameError: propTypes.string,
  firstName: propTypes.string.isRequired,
  onFirstNameChange: propTypes.func.isRequired,
  firstNameError: propTypes.string,
  lastName: propTypes.string.isRequired,
  onLastNameChange: propTypes.func.isRequired,
  lastNameError: propTypes.string,
  password: propTypes.string.isRequired,
  onPasswordChange: propTypes.func.isRequired,
  passwordError: propTypes.string,
  onSubmit: propTypes.func.isRequired,
  disabled: propTypes.bool,
};

export default RegisterForm;
