import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={'#f05c63'} size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    borderRadius: 15,
  },
});

export default Loader;
