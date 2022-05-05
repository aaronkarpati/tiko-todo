import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const TodoForm = ({onSubmit, initialValues}) => {
  const [description, setDescription] = useState(initialValues.description);

  return (
    <View>
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        maxLength={30}
        onChangeText={text => setDescription(text)}
      />
      <TouchableOpacity
        onPress={() => {
          onSubmit(description);
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

TodoForm.defaultProps = {
  initialValues: {
    description: '',
  },
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderBottomWidth: 1.2,
    borderRadius: 10,
    borderColor: '#f05c63',
    marginBottom: 20,
    paddingVertical: 10,
    color: 'black',
  },
  button: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#432a5a',
  },
  buttonTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TodoForm;
