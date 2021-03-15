import React from 'react';
import { useQuery } from '@apollo/client';
import {
  CircularProgress, Paper, TableContainer, Table, TableCell, TableHead, TableRow, TableBody,
} from '@material-ui/core';
import { QUERY_USER_ROLE, QUERY_USERS_DETAILED } from '../graphql/queries';
import { useAuth } from '../AuthProvider';

const ADMIN_ROLE_ID = 1;

function JobFeed() {
  const auth = useAuth();
  const {
    loading: userRoleLoading,
    error: userRoleError,
    data: userRoleData,
  } = useQuery(QUERY_USER_ROLE, {
    variables: { id: parseInt(auth.user, 10) },
  });
  const { loading, error, data } = useQuery(QUERY_USERS_DETAILED);

  if (loading || userRoleLoading) {
    return (
      <CircularProgress />
    );
  }
  if (error) {
    return (error.message);
  }
  if (userRoleError) {
    return (userRoleError.message);
  }
  if (userRoleData.user.userRole.id !== ADMIN_ROLE_ID) {
    return (<div>Access Denied</div>);
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.username}</TableCell>
              <TableCell>{u.firstName}</TableCell>
              <TableCell>{u.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default JobFeed;
