import React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';
import useAuth from './use-auth';

function NavBar() {
  const auth = useAuth();
  const handleSignOut = () => {
    auth.signOut();
  };
  const signOutButton = (
    auth.user
      ? <Button onClick={handleSignOut}>Sign Out</Button>
      : <div />
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          Job Portal
        </Typography>
        <div>
          {signOutButton}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
