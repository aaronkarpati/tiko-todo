import React, {createContext, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';

const AxiosContext = createContext();
const {Provider} = AxiosContext;

/**
 *
 * @param {} children
 * @returns A context that handles the request formulation towards the Tiko API,
 * it attaches two interceptors, one for the Bearer token and one for refreshing the accsess token.
 */
const AxiosProvider = ({children}) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: 'https://rocky-earth-59000.herokuapp.com/api/',
  });

  const publicAxios = axios.create({
    baseURL: 'https://rocky-earth-59000.herokuapp.com/api/',
  });

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = failedRequest => {
    const data = {
      refresh: authContext.authState.refresh,
    };

    const options = {
      method: 'POST',
      data,
      url: 'https://rocky-earth-59000.herokuapp.com/api/token/refresh/',
    };

    return axios(options)
      .then(async tokenRefreshResponse => {
        failedRequest.response.config.headers.Authorization =
          'Bearer ' + tokenRefreshResponse.data.access;

        authContext.setAuthState({
          ...authContext.authState,
          access: tokenRefreshResponse.data.access,
        });

        await Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            access: tokenRefreshResponse.data.access,
            refresh: authContext.authState.refresh,
          }),
        );

        return Promise.resolve();
      })
      .catch(_ => {
        authContext.logout();
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};
