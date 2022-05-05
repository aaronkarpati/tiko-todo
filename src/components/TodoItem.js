import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TodoContext} from '../context/TodoContext';

const TodoItem = ({item}) => {
  const navigation = useNavigation();

  const {todos, editTodo} = useContext(TodoContext);
  const todo = todos.find(x => x.id === item.id);

  return (
    <TouchableOpacity
      onLongPress={() =>
        editTodo(todo.id, todo.description, !todo.done, () => {})
      }
      onPress={() => navigation.navigate('Edit', {id: item.id})}>
      <View style={[styles.row, {opacity: todo.done ? 0.5 : 1}]}>
        {todo.done ? (
          <View style={styles.box}>
            <Text style={styles.boxTitle}> ✓ </Text>
          </View>
        ) : null}

        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              {
                textDecorationLine: todo.done ? 'line-through' : 'none',
                textDecorationColor: '#f05c63',
              },
            ]}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 9.22,

    elevation: 3,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  box: {
    padding: 5,
    backgroundColor: '#f05c63',
    marginRight: 10,
    borderRadius: 30,
  },
  boxTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TodoItem;
