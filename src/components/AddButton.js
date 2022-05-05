import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const AddButton = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.container, {bottom: insets.bottom}]}
      onPress={() => navigation.navigate('Create')}>
      <Text style={styles.icon}> + </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#432a5a',
    padding: 20,
    borderRadius: 20,
    position: 'absolute',
    right: 20,
  },
  icon: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AddButton;
