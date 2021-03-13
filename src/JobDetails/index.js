import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Card, CircularProgress, CardHeader, CardContent,
  Typography, List, ListItem, ListSubheader, ListItemText,
} from '@material-ui/core';
import { QUERY_JOB_DETAILS } from '../graphql/queries';

function JobDetails() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_JOB_DETAILS, {
    variables: { id: parseInt(id, 10) },
  });
  if (loading) {
    return (
      <CircularProgress />
    );
  }
  if (error) {
    return (error.message);
  }

  const j = data.job;
  return (
    <Card>
      <CardHeader title={j.name} subheader={j.company.name} />
      <CardContent>
        <Typography variant="body1">
          {j.description}
        </Typography>
        <List>
          <ListSubheader>Skills</ListSubheader>
          {j.jobSkills.map((s) => (
            <ListItem key={s.skill.id} dense>
              <ListItemText>{s.skill.name}</ListItemText>
            </ListItem>
          ))}
          <ListSubheader>Requirements</ListSubheader>
          {j.jobRequirements.map((r) => (
            <ListItem key={r.id} dense>
              <ListItemText>{r.name}</ListItemText>
            </ListItem>
          ))}
          <ListSubheader>Benefits</ListSubheader>
          {j.jobBenefits.map((b) => (
            <ListItem key={b.id} dense>
              <ListItemText>{b.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default JobDetails;
