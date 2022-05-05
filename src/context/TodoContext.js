import React, {createContext, useState, useContext} from 'react';
import {AxiosContext} from './AxiosContext';
import {ErrorContext} from './ErrorContext';
import {LoaderContext} from './LoaderContext';

const TodoContext = createContext(null);
const {Provider} = TodoContext;

/**
 *
 * @param {} children
 * @returns A context that handles all the necessary state and API calls/changes from the tiko API,
 * in regards of the Todo CRUD operations.
 */
const TodoProvider = ({children}) => {
  const {authAxios} = useContext(AxiosContext);
  const {setLoading} = useContext(LoaderContext);
  const {setError} = useContext(ErrorContext);

  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      setLoading(true);
      const response = await authAxios.get('/todos/');
      response.data.sort((x, y) => {
        return x.done === y.done ? 0 : x.done ? 1 : -1;
      });
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };

  const createTodo = async (description, callback) => {
    try {
      setLoading(true);
      await authAxios.post('/todos/', {description});
      setLoading(false);
      if (callback) {
        callback();
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };

  const editTodo = async (id, description, done, callback) => {
    try {
      setLoading(true);
      await authAxios.put(`/todos/${id}`, {description, done});
      const _todos = todos.map(todo => {
        return todo.id === id ? {id, description, done} : todo;
      });
      _todos.sort((x, y) => {
        return x.done === y.done ? 0 : x.done ? 1 : -1;
      });
      setTodos(_todos);
      setLoading(false);
      if (callback) {
        callback();
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };

  const deleteTodo = async (id, callback) => {
    try {
      setLoading(true);
      await authAxios.delete(`/todos/${id}`);
      const _todos = todos.filter(todo => todo.id !== id);
      setTodos(_todos);
      setLoading(false);
      if (callback) {
        callback();
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };

  return (
    <Provider
      value={{
        todos,
        getTodos,
        createTodo,
        editTodo,
        deleteTodo,
      }}>
      {children}
    </Provider>
  );
};

export {TodoContext, TodoProvider};
