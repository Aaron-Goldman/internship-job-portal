import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
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
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
    setErrorMessage('');
  };
  const handleFirstNameInput = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameInput = (event) => {
    setLastName(event.target.value);
  };
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.register(username, firstName, lastName, password);
      history.push(HOME_PATH);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <Card style={{
      boxSizing: 'border-box',
      maxWidth: '400px',
      margin: '1em auto',
      alignItems: 'center',
    }}
    >
      <RegisterForm
        username={username}
        onUsernameChange={handleUsernameInput}
        firstName={firstName}
        onFirstNameChange={handleFirstNameInput}
        lastName={lastName}
        onLastNameChange={handleLastNameInput}
        password={password}
        onPasswordChange={handlePasswordInput}
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
      />
    </Card>
  );
}

export default Register;
