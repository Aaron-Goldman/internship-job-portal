import React from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
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
        {signOutButton}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
