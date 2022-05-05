import React, {useEffect, useContext} from 'react';
import {StyleSheet, SafeAreaView, FlatList, View, Text} from 'react-native';
import AddButton from '../components/AddButton';
import Header from '../components/Header';
import TodoItem from '../components/TodoItem';
import {TodoContext} from '../context/TodoContext';
import HomeImage from '../assets/multi-tasking-ceo-handling-multiple-departments-with-ease.svg';

/**
 *
 * @param {} navigation
 * @returns A screen that displays the list of Todo items, as well as fetch it if necessary.
 */
const HomeScreen = ({navigation}) => {
  const {todos, getTodos} = useContext(TodoContext);

  useEffect(() => {
    getTodos();

    const listener = navigation.addListener('focus', () => {
      getTodos();
    });

    return listener;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          keyExtractor={todo => todo.id}
          contentContainerStyle={styles.contentContainer}
          renderItem={({item}) => {
            return <TodoItem item={item} />;
          }}
        />
      ) : (
        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: 30}}>
          <HomeImage height={250} fill="#000" />
          <Text style={styles.description}>
            Hi there, your list seems to be empty, dont forget to add new Todos
            to your list with the add button at the corner.
          </Text>
          <Text style={styles.subInformation}>
            Try out what happens if you press quickly or press longer on a Todo!
          </Text>
        </View>
      )}
      <AddButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 20,
  },
  description: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 5,
  },
  subInformation: {
    fontSize: 16,
    color: '#f05c63',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
