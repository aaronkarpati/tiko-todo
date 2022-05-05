import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const Backdrop = ({onPress, children}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2);',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Backdrop;
