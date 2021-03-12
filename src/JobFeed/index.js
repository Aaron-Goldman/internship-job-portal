import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Card, CardContent, CircularProgress, Typography, CardActions, Button, Link,
} from '@material-ui/core';
import { QUERY_JOBS } from '../graphql/queries';
import { NOT_FOUND_PATH } from '../paths';

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
