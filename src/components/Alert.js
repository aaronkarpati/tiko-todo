import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

/**
 *
 * @param {title,description} initialValues
 * @returns A global alert component that processes displays error messeges.
 */
const Alert = ({initialValues}) => {
  const processObject = object => {
    for (const [key, value] of Object.entries(object)) {
      return (
        <Text style={styles.description}>
          {key}:{value}
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{initialValues.title}</Text>
      {typeof initialValues.description === 'object' ? (
        processObject(initialValues.description)
      ) : (
        <Text style={styles.description}>{initialValues.description}</Text>
      )}
    </View>
  );
};

Alert.defaultProps = {
  initialValues: {
    title: 'Error',
    description: 'An error occured in the process.',
  },
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f05c63',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
});

export default Alert;
