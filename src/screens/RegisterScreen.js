import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import BackButton from '../components/BackButton';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import {ErrorContext} from '../context/ErrorContext';
import {LoaderContext} from '../context/LoaderContext';
import validator from 'validator';

/**
 *
 * @param {} navigation
 * @returns A screen that presents the registration form for a user.
 */
const RegisterScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [emailValidated, setEmailValidated] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState(false);

  const {publicAxios} = useContext(AxiosContext);
  const {setUser} = useContext(AuthContext);

  const {setError} = useContext(ErrorContext);
  const {setLoading} = useContext(LoaderContext);

  const register = async () => {
    try {
      setLoading(true);
      const response = await publicAxios.post('register/', {
        email,
        password,
        password2,
        first_name: firstName,
        last_name: lastName,
      });
      setUser({
        first_name: response.data.first_name || '',
        last_name: response.data.last_name || '',
        email: response.data.email || '',
      });
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      if (error.response.data) {
        setError(error.response.data);
      }
    }
  };

  const validateEmail = text => {
    setEmailValidated(validator.isEmail(text));
    setEmail(text);
  };

  const validatePassword = text => {
    setPasswordValidated(password === text);
    setPassword2(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.parent}>
        <View style={styles.iconContainer}>
          <BackButton />
        </View>
        <Text style={[styles.title]}>Register</Text>
        <Text style={styles.description}>
          Here you are able to create a new account for Todo, don't worry it
          only takes a few seconds.
        </Text>

        <TextInput
          placeholder="First name"
          style={styles.input}
          value={firstName}
          maxLength={150}
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          placeholder="Last name"
          style={styles.input}
          value={lastName}
          maxLength={150}
          onChangeText={text => setLastName(text)}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={[styles.input, {color: emailValidated ? 'black' : 'red'}]}
          value={email}
          onChangeText={text => validateEmail(text)}
        />
        <TextInput
          placeholder="Password (min 8)"
          style={[styles.input, {color: passwordValidated ? 'black' : 'red'}]}
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          placeholder="Password 2 (min 8)"
          style={[styles.input, {color: passwordValidated ? 'black' : 'red'}]}
          value={password2}
          secureTextEntry={true}
          onChangeText={text => validatePassword(text)}
        />
        <TouchableOpacity
          disabled={!passwordValidated || !emailValidated}
          onPress={register}>
          <View
            style={[
              styles.button,
              {opacity: !passwordValidated || !emailValidated ? 0.8 : 1},
            ]}>
            <Text style={styles.buttonTitle}>Register</Text>
          </View>
        </TouchableOpacity>
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
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f05c63',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1.2,
    borderRadius: 10,
    borderColor: '#f05c63',
    marginBottom: 20,
    paddingVertical: 10,
    color: 'black',
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
});

export default RegisterScreen;
