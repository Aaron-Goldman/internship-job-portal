import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import RegisterForm from './RegisterForm';
import useAuth from '../use-auth';
import { HOME_PATH } from '../paths';

function Register() {
  const auth = useAuth();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const disabled = !(username && firstName && lastName && password);

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
    setUsernameError(event.target.value ? '' : 'Username required.');
  };
  const handleFirstNameInput = (event) => {
    setFirstName(event.target.value);
    setFirstNameError(event.target.value ? '' : 'First name required.');
  };
  const handleLastNameInput = (event) => {
    setLastName(event.target.value);
    setLastNameError(event.target.value ? '' : 'Last name required.');
  };
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
    setPasswordError(event.target.value ? '' : 'Password required.');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.register(username, firstName, lastName, password);
      history.push(HOME_PATH);
    } catch (e) {
      setUsernameError(e.message);
    }
  };

  return (
    <Card style={{
      boxSizing: 'border-box',
      maxWidth: '400px',
      margin: 'auto',
      alignItems: 'center',
    }}
    >
      <CardHeader title="Register" />
      <CardContent>
        <RegisterForm
          username={username}
          onUsernameChange={handleUsernameInput}
          usernameError={usernameError}
          firstName={firstName}
          onFirstNameChange={handleFirstNameInput}
          firstNameError={firstNameError}
          lastName={lastName}
          onLastNameChange={handleLastNameInput}
          lastNameError={lastNameError}
          password={password}
          onPasswordChange={handlePasswordInput}
          passwordError={passwordError}
          onSubmit={handleSubmit}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
}

export default Register;
