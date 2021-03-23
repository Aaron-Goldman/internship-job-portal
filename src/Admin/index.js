import React from 'react';
import { useQuery } from '@apollo/client';
import {
  CircularProgress, Paper, TableContainer, Table,
  TableCell, TableHead, TableRow, TableBody, Snackbar,
} from '@material-ui/core';
import { QUERY_USER_ROLE, QUERY_USERS_DETAILED } from '../graphql/queries';
import { useAuth } from '../AuthProvider';
import EditDialog from './EditDialog';
import DeleteDialog from './DeleteDialog';

const ADMIN_ROLE_ID = 1;

function JobFeed() {
  const auth = useAuth();
  const {
    loading: userRoleLoading,
    error: userRoleError,
    data: userRoleData,
  } = useQuery(QUERY_USER_ROLE, {
    variables: { id: Number(auth.user) },
  });
  const { loading, error, data } = useQuery(QUERY_USERS_DETAILED);

  return (
    <div>
      {(loading || userRoleLoading) && <CircularProgress />}
      <Snackbar open={error} message={error && error.message} />
      <Snackbar open={userRoleError} message={userRoleError && userRoleError.message} />
      {userRoleData && (
        <div>
          <Snackbar open={userRoleData.user.userRole.id !== ADMIN_ROLE_ID} message="Access Denied" />
          {data && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>First name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell colSpan={2} />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.users.map(({
                  id, username, firstName, lastName,
                }) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{username}</TableCell>
                    <TableCell>{firstName}</TableCell>
                    <TableCell>{lastName}</TableCell>
                    <TableCell><EditDialog userId={id} /></TableCell>
                    <TableCell><DeleteDialog userId={id} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}
        </div>
      )}
    </div>
  );
}

export default JobFeed;
