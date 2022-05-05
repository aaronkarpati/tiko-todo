import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const Header = () => {
  const {logout, user} = useContext(AuthContext);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>
          Welcome {user.first_name ? user.first_name : 'back'}!
        </Text>
        <Text style={styles.description}>It is time for some Todos!</Text>
      </View>
      <TouchableOpacity onPress={logout}>
        <View style={styles.profile}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>⏎</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile: {
    backgroundColor: '#432a5a',
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f05c63',
  },
  description: {
    fontSize: 18,
    color: 'gray',
  },
});

export default Header;
