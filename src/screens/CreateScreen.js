import React, {useContext} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import BackButton from '../components/BackButton';
import TodoForm from '../components/TodoForm';
import {TodoContext} from '../context/TodoContext';

/**
 *
 * @param {} navigation
 * @returns A screen that displays the necessary components for creating a Todo.
 */
const CreateScreen = ({navigation}) => {
  const {createTodo} = useContext(TodoContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.parent}>
        <View style={styles.iconContainer}>
          <BackButton />
        </View>
        <Text style={[styles.title]}>Create a Todo</Text>
        <Text style={styles.description}>
          In this area you are able to create a new Todo that will be added to
          you Todo list.
        </Text>
        <TodoForm
          onSubmit={description => {
            createTodo(description, () => {
              navigation.goBack();
            });
          }}
        />
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
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default CreateScreen;
