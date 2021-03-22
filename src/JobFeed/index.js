import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Card, CardContent, CircularProgress, Typography, CardActions, Button, Link, Snackbar,
} from '@material-ui/core';
import { QUERY_JOBS } from '../graphql/queries';
import { NOT_FOUND_PATH } from '../paths';

function JobFeed() {
  const { loading, error, data } = useQuery(QUERY_JOBS);

  return (
    <div>
      {loading && <CircularProgress />}
      <Snackbar open={!!error}>{error && error.message}</Snackbar>
      {data && data.jobs.map(({
        id, description, name, company: { name: companyName },
      }) => (
        <Card key={id}>
          <CardContent>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="subtitle1">{companyName}</Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
          <CardActions>
            <Button variant="text" color="default" component={Link} to={NOT_FOUND_PATH}>
              Details
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default JobFeed;
