import React from 'react';
import { useQuery } from '@apollo/client';
import {
  CircularProgress, Paper, TableContainer, Table,
  TableCell, TableHead, TableRow, TableBody, Snackbar,
} from '@material-ui/core';
import { QUERY_USER, QUERY_USERS_DETAILED } from '../graphql/queries';
import { useAuth } from '../AuthProvider';
import EditDialog from './EditDialog';
import DeleteDialog from './DeleteDialog';
import AddDialog from './AddDialog';

const ADMIN_ROLE_ID = 1;

function Admin() {
  const auth = useAuth();
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(QUERY_USER, {
    variables: { id: Number(auth.user) },
  });
  const { loading, error, data } = useQuery(QUERY_USERS_DETAILED);

  return (
    <div>
      {(loading || userLoading) && <CircularProgress />}
      <Snackbar open={error} message={error && error.message} />
      <Snackbar open={userError} message={userError && userError.message} />
      {userData && (
      <>
        {userData.user.userRole.id !== ADMIN_ROLE_ID
          ? <Snackbar open message="Access Denied" />
          : data && (
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
                <TableRow>
                  <TableCell colSpan={5} />
                  <AddDialog />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          )}
      </>
      )}
    </div>
  );
}

export default Admin;
