import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
} from '@material-ui/core';
import { gql, useMutation, useQuery } from '@apollo/client';
import { REGISTER } from '../graphql/mutations';
import { QUERY_USERS } from '../graphql/queries';

function AddDialog() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const { data: users } = useQuery(QUERY_USERS);
  const [createUser] = useMutation(REGISTER, {
    update(cache, { data: { createUser: data } }) {
      cache.modify({
        fields: {
          users(existingUsers = []) {
            const newUserRef = cache.writeFragment({
              data,
              fragment: gql`
                fragment newUser on users {
                  id
                  username
                  firstName
                  lastName
                }
              `,
            });
            return [...existingUsers, newUserRef];
          },
        },
      });
    },
    variables: {
      username,
      firstName,
      lastName,
      password,
    },
  });

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
    setError('');
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    if (users && users.users.find((u) => u.username === username)) {
      setError('Username exists.');
      return;
    }
    createUser();
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add User</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            label="Username"
            value={username}
            error={!username || error}
            helperText={error || (!username && 'Username required.')}
            onChange={handleUsernameInput}
          />
          <TextField
            label="First name"
            value={firstName}
            error={!firstName}
            helperText={!firstName && 'First name required.'}
            onChange={handleFirstNameInput}
          />
          <TextField
            label="Last name"
            value={lastName}
            error={!lastName}
            helperText={!lastName && 'Last name required.'}
            onChange={handleLastNameInput}
          />
          <TextField
            label="Password"
            value={password}
            error={!password}
            helperText={!password && 'Password required.'}
            onChange={handlePasswordInput}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirm}
            disabled={!(username && firstName && lastName && password)}
          >
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddDialog;
