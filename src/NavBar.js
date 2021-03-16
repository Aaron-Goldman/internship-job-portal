import React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useAuth } from './AuthProvider';

function NavBar() {
  const auth = useAuth();
  const handleSignOut = () => {
    auth.signOut();
  };
  const isLoggedIn = !!auth.user;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          Job Portal
        </Typography>
        {isLoggedIn && <Button onClick={handleSignOut}>Sign Out</Button>}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
