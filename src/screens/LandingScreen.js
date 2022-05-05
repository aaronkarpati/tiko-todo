import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import LoginImage from '../assets/business-lady-do-multi-tasking.svg';
import {AxiosContext} from '../context/AxiosContext';
import {AuthContext} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {ErrorContext} from '../context/ErrorContext';
import {LoaderContext} from '../context/LoaderContext';

/**
 *
 * @param {} navigation
 * @returns A screen that lets the user log in to an existing account or redirect to the registration screen.
 */
const LandingScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setError} = useContext(ErrorContext);
  const {setLoading} = useContext(LoaderContext);

  const authContext = useContext(AuthContext);
  const {publicAxios} = useContext(AxiosContext);

  const login = async () => {
    try {
      setLoading(true);
      const response = await publicAxios.post('login/', {
        email,
        password,
      });

      const {access, refresh} = response.data;
      authContext.setAuthState({
        access,
        refresh,
        authenticated: true,
      });

      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          access,
          refresh,
        }),
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response.data) {
        setError(error.response.data);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoginImage height={250} fill="#000" />
      <View style={styles.parent}>
        <Text style={styles.title}>Welcome to Todo</Text>
        <Text style={styles.description}>
          This project is a React Native cross platform todo application created
          for the tiko challenge!
        </Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity onPress={() => login()}>
          <View style={[styles.button]}>
            <Text style={styles.buttonTitle}>Sign In</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text>I dont have an account yet. </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerTitle}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  parent: {
    paddingHorizontal: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f05c63',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#432a5a',
  },
  buttonTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  registerTitle: {
    fontWeight: 'bold',
    color: '#f05c63',
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1.2,
    borderRadius: 10,
    borderColor: '#f05c63',
    marginBottom: 20,
    padding: 10,
    color: 'black',
  },
});

export default LandingScreen;
