import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Typography,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import propTypes from 'prop-types';
import { QUERY_USER } from '../graphql/queries';

function DeleteDialog(props) {
  const { userId } = props;
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { id: Number(userId) },
    onCompleted: () => {
      const { user: userData } = data;
      setUser(userData);
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { username, firstName, lastName } = user;

  return (
    <div>
      <Button disabled={loading || error} onClick={handleOpen}>Delete</Button>
      {loading && <CircularProgress />}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete this user?</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">Username</Typography>
          <Typography variant="body1">{`${username}`}</Typography>
          <Typography variant="subtitle2">Name</Typography>
          <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Confirm</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteDialog.propTypes = {
  userId: propTypes.number.isRequired,
};

export default DeleteDialog;
