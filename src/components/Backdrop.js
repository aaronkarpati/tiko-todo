import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

/**
 *
 * @param {()=>{}} onPress
 * @param {*} children
 * @returns A backdrop component that handles hide logic via the onPress props as well
 *  as displays children components that are passed inside the JSX.
 */
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
