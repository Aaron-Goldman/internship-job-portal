import React, {
  useState,
  useContext,
  createContext,
} from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USERS } from './graphql/queries';
import { REGISTER } from './graphql/mutations';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(localStorage.getItem('user') || undefined);
  const { refetch: refetchUsers } = useQuery(QUERY_USERS);
  const [addUser] = useMutation(REGISTER);

  const signIn = async (username, password) => {
    const result = await refetchUsers();
    if (!result) throw Error('Server did not respond.');
    const match = result.data.users.find((u) => u.username === username && u.password === password);
    if (!match) throw Error('Incorrect username or password.');
    setUser(match.id);
    localStorage.setItem('user', match.id);
    return result;
  };

  const signOut = () => {
    setUser(undefined);
    localStorage.removeItem('user');
  };

  const register = async (username, firstName, lastName, password) => {
    const users = await refetchUsers();
    if (users && users.data.users.find((u) => u.username === username)) {
      throw Error('Username taken.');
    }
    const result = await addUser({
      variables: {
        username,
        firstName,
        lastName,
        password,
      },
    });
    return result;
  };

  return {
    user,
    signIn,
    signOut,
    register,
  };
}

function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
AuthProvider.defaultProps = { children: <div /> };
AuthProvider.propTypes = { children: PropTypes.element };

export default AuthProvider;
