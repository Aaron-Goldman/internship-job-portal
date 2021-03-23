import React, { useState } from 'react';
import { isApolloError } from '@apollo/client';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import {
  CardContent, CardHeader, Divider, Typography,
} from '@material-ui/core';
import { HOME_PATH, REGISTER_PATH } from '../paths';
import LoginForm from './LoginForm';
import { useAuth } from '../AuthProvider';

function Login() {
  const auth = useAuth();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const disabled = !(username && password);

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
    setUsernameError(event.target.value ? '' : 'Username required.');
  };
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
    setPasswordError(event.target.value ? '' : 'Password required.');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.signIn(username, password);
      history.push(HOME_PATH);
    } catch (e) {
      if (isApolloError(e)) { throw e; }
      setUsernameError(e.message);
    }
  };

  return (
    <Card style={{
      boxSizing: 'border-box',
      maxWidth: '400px',
      margin: 'auto',
    }}
    >
      <CardHeader title="Login" />
      <CardContent>
        <LoginForm
          username={username}
          onUsernameChange={handleUsernameInput}
          usernameError={usernameError}
          password={password}
          onPasswordChange={handlePasswordInput}
          passwordError={passwordError}
          onSubmit={handleSubmit}
          disabled={disabled}
        />
        <Divider />
        <br />
        <Typography variant="subtitle2">
          {'Don\'t have an account?'}
        </Typography>
        <Button variant="text" color="default" component={Link} to={REGISTER_PATH}>
          Register Now
        </Button>
      </CardContent>
    </Card>
  );
}

export default Login;
