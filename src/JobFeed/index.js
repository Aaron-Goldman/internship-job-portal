import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Card, CardContent, CircularProgress, Typography, CardActions, Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { QUERY_JOBS } from '../graphql/queries';
import { JOB_DETAILS_BASE_PATH } from '../paths';

function JobFeed() {
  const { loading, error, data } = useQuery(QUERY_JOBS);
  if (loading) {
    return (
      <CircularProgress />
    );
  }
  if (error) {
    return (error.message);
  }

  return (
    <div>
      {data.jobs.map((j) => (
        <Card key={j.id}>
          <CardContent>
            <Typography variant="h5">{j.name}</Typography>
            <Typography variant="subtitle1">{j.company.name}</Typography>
            <Typography variant="body2">{j.description}</Typography>
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
