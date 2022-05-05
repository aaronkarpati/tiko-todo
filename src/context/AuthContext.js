import React, {createContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext(null);
const {Provider} = AuthContext;

/**
 *
 * @param {} children
 * @returns A contect hat handles the authentication state of the user.
 */
const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    access: null,
    refresh: null,
    authenticated: false,
  });

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      access: null,
      refresh: null,
      authenticated: false,
    });
    setUser({
      first_name: '',
      last_name: '',
      email: '',
    });
  };

  const getAccessToken = () => {
    return authState.access;
  };

  return (
    <Provider
      value={{
        user,
        setUser,
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </Provider>
  );
};

export {AuthContext, AuthProvider};
