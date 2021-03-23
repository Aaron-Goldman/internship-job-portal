import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { JOB_FEED_PATH } from '../paths';

function Home() {
  return (
    <div>
      Home
      <Button variant="text" color="default" component={Link} to={JOB_FEED_PATH}>
        Job Feed
      </Button>
    </div>
  );
}

export default Home;
