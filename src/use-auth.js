import React, {
  useState,
  useContext,
  createContext,
} from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import QUERY_USERS from './graphql/queries';
import REGISTER from './graphql/mutations';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(localStorage.getItem('user') || 0);
  const { refetch: refetchUsers } = useQuery(QUERY_USERS);
  const [addUser] = useMutation(REGISTER);

  const signIn = async (username, password) => {
    const result = await refetchUsers();
    if (!result) return result;
    const match = result.data.users.find((u) => u.username === username);
    if (!match || match.password !== password) return result;
    setUser(match.id);
    localStorage.setItem('user', match.id);
    return result;
  };

  const signOut = () => {
    setUser(0);
    localStorage.setItem('user', 0);
  };

  const register = async (username, firstName, lastName, password) => {
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

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
AuthProvider.defaultProps = { children: <div /> };
AuthProvider.propTypes = { children: PropTypes.element };

export default useAuth;
