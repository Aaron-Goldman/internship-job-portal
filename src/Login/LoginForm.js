import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';

function LoginForm(props) {
  const {
    username,
    onUsernameChange,
    usernameError,
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
        error={!!usernameError}
        helperText={usernameError}
        value={username}
        onChange={onUsernameChange}
      />
      <TextField
        id="password-field"
        label="Password"
        type="password"
        autoComplete="current-password"
        name="password"
        error={!!passwordError}
        helperText={passwordError}
        value={password}
        onChange={onPasswordChange}
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
        Login
      </Button>
    </form>
  );
}

LoginForm.defaultProps = {
  usernameError: '',
  passwordError: '',
  disabled: false,
};

LoginForm.propTypes = {
  username: propTypes.string.isRequired,
  onUsernameChange: propTypes.func.isRequired,
  usernameError: propTypes.string,
  password: propTypes.string.isRequired,
  onPasswordChange: propTypes.func.isRequired,
  passwordError: propTypes.string,
  onSubmit: propTypes.func.isRequired,
  disabled: propTypes.bool,
};

export default LoginForm;
