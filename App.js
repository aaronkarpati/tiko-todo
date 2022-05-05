import React, {useContext, useState, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LandingScreen from './src/screens/LandingScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

import {AuthContext} from './src/context/AuthContext';
import * as Keychain from 'react-native-keychain';

import Loader from './src/components/Loader';
import {AxiosContext} from './src/context/AxiosContext';
import Backdrop from './src/components/Backdrop';

const Stack = createNativeStackNavigator();

const App = () => {
  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);

  const [status, setStatus] = useState(true);

  const getToken = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const token = JSON.parse(value.password);

      await publicAxios.post('token/verify/', {
        token: token.refresh,
      });

      authContext.setAuthState({
        access: token.access || null,
        refresh: token.refresh || null,
        authenticated: token.access !== null,
      });
      setStatus(false);
    } catch (error) {
      setStatus(false);
      authContext.setAuthState({
        access: null,
        refresh: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    getToken();
  }, [getToken]);

  if (status) {
    return (
      <Backdrop>
        <Loader />
      </Backdrop>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authContext?.authState?.authenticated !== false ? (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Create" component={CreateScreen} />
            <Stack.Screen name="Edit" component={EditScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
