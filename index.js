/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/AuthContext';
import {AxiosProvider} from './src/context/AxiosContext';
import {TodoProvider} from './src/context/TodoContext';
import {LoaderProvider} from './src/context/LoaderContext';
import {ErrorProvider} from './src/context/ErrorContext';
import {Host} from 'react-native-portalize';

import React from 'react';

const Wrapper = () => {
  return (
    <Host>
      <AuthProvider>
        <AxiosProvider>
          <LoaderProvider>
            <ErrorProvider>
              <TodoProvider>
                <App />
              </TodoProvider>
            </ErrorProvider>
          </LoaderProvider>
        </AxiosProvider>
      </AuthProvider>
    </Host>
  );
};

AppRegistry.registerComponent(appName, () => Wrapper);
