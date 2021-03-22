import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Card, CircularProgress, CardHeader, CardContent,
  Typography, List, ListItem, ListSubheader, ListItemText, Snackbar,
} from '@material-ui/core';
import { QUERY_JOB_DETAILS } from '../graphql/queries';

function JobDetails() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_JOB_DETAILS, {
    variables: { id: Math.trunc(Number(id)) },
  });

  return (
    <div>
      {loading && <CircularProgress />}
      <Snackbar open={!!error} message={error && error.message} />
      {data && (
        ({
          job: {
            description,
            name,
            company: { name: companyName },
            jobSkills,
            jobRequirements,
            jobBenefits,
          },
        }) => (
          <Card>
            <CardHeader title={name} subheader={companyName} />
            <CardContent>
              <Typography variant="body1">
                {description}
              </Typography>
              <List>
                <ListSubheader>Skills</ListSubheader>
                {jobSkills.map(({ skill: { id: skillId, name: skillName } }) => (
                  <ListItem key={skillId} dense>
                    <ListItemText>{skillName}</ListItemText>
                  </ListItem>
                ))}
                <ListSubheader>Requirements</ListSubheader>
                {jobRequirements.map(({ id: requirementId, name: requirementName }) => (
                  <ListItem key={requirementId} dense>
                    <ListItemText>{requirementName}</ListItemText>
                  </ListItem>
                ))}
                <ListSubheader>Benefits</ListSubheader>
                {jobBenefits.map(({ id: benefitId, name: benefitName }) => (
                  <ListItem key={benefitId} dense>
                    <ListItemText>{benefitName}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )
      )(data)}
    </div>
  );
}

export default JobDetails;
