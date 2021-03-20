import React, { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Typography,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import propTypes from 'prop-types';
import { QUERY_USER } from '../graphql/queries';

function DeleteDialog(props) {
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
      <DialogContent>
        <Typography variant="subtitle2">Username</Typography>
        <Typography variant="body1">{`${user.username}`}</Typography>
        <Typography variant="subtitle2">Name</Typography>
        <Typography variant="body1">{`${user.firstName} ${user.lastName}`}</Typography>
      </DialogContent>
    );
  };

  return (
    <div>
      <Button onClick={handleOpen}>Delete</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete this user?</DialogTitle>
        {dialogContent()}
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
