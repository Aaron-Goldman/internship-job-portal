import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Card, CardContent, CircularProgress, Typography, CardActions, Button, Link, Snackbar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { QUERY_JOBS } from '../graphql/queries';
import { JOB_DETAILS_BASE_PATH } from '../paths';

function JobFeed() {
  const { loading, error, data } = useQuery(QUERY_JOBS);

  return (
    <div>
      {loading && <CircularProgress />}
      <Snackbar open={!!error} message={error && error.message} />
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
            <Button variant="text" color="default" component={Link} to={`${JOB_DETAILS_BASE_PATH}${j.id}`}>
              Details
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default JobFeed;
