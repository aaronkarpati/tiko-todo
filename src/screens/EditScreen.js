import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import BackButton from '../components/BackButton';
import TodoForm from '../components/TodoForm';
import {TodoContext} from '../context/TodoContext';

const EditScreen = ({route, navigation}) => {
  const {id} = route.params;
  const {todos, editTodo, deleteTodo} = useContext(TodoContext);
  const todo = todos.find(item => item.id === id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.parent}>
        <View style={styles.iconContainer}>
          <BackButton />
        </View>
        <Text style={[styles.title]}>Edit a Todo</Text>
        <Text style={styles.description}>
          In this area you are able to edit a Todo that already exists in your
          Todo list.
        </Text>
        <TodoForm
          initialValues={{description: todo?.description}}
          onSubmit={description => {
            editTodo(id, description, todo.done, () => {
              navigation.goBack();
            });
          }}
        />
        <View style={styles.deleteContainer}>
          <Text>I would like to delete this Todo </Text>
          <TouchableOpacity
            onPress={() =>
              deleteTodo(id, () => {
                navigation.goBack();
              })
            }>
            <Text style={styles.deleteTitle}>Delete</Text>
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
  deleteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  deleteTitle: {
    fontWeight: 'bold',
    color: '#f05c63',
  },
});

export default EditScreen;
