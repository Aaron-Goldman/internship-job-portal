import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress,
} from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import propTypes from 'prop-types';
import { QUERY_USER } from '../graphql/queries';
import { UPDATE_USER } from '../graphql/mutations';

function EditDialog(props) {
  const { userId } = props;
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { id: Number(userId) },
    onCompleted: () => {
      const { user } = data;
      const {
        username: currentUsername,
        firstName: currentFirstName,
        lastName: currentLastName,
      } = user;
      setUsername(currentUsername);
      setFirstName(currentFirstName);
      setLastName(currentLastName);
    },
  });
  const [updateUser] = useMutation(UPDATE_USER, {
    variables: {
      id: Number(userId),
      username,
      firstName,
      lastName,
    },
  });

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };
  const handleFirstNameInput = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameInput = (event) => {
    setLastName(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = () => {
    updateUser();
    handleClose();
  };

  return (
    <div>
      <Button disabled={loading || error} onClick={handleOpen}>Edit</Button>
      {loading && <CircularProgress />}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit user</DialogTitle>
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            label="Username"
            value={username}
            error={!username}
            helperText={!username && 'Username required.'}
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
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirm}
            disabled={!(username && firstName && lastName)}
          >
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

EditDialog.propTypes = {
  userId: propTypes.number.isRequired,
};

export default EditDialog;
