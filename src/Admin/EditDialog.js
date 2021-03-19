import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import propTypes from 'prop-types';
import { QUERY_USER } from '../graphql/queries';

function EditDialog(props) {
  const { userId } = props;
  const [open, setOpen] = useState(false);
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { id: Number(userId) },
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dialogContent = () => {
    if (loading) {
      return <DialogContent><CircularProgress /></DialogContent>;
    }

    if (error) {
      return <DialogContent>{error.message}</DialogContent>;
    }

    const { user } = data;
    return (
      <DialogContent
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField label="Username" defaultValue={user.username} />
        <TextField label="First name" defaultValue={user.firstName} />
        <TextField label="Last name" defaultValue={user.lastName} />
      </DialogContent>
    );
  };

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit user</DialogTitle>
        {dialogContent()}
        <DialogActions>
          <Button onClick={handleClose}>Confirm</Button>
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
