import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

type FormList = {
  addList: (name: string) => void;
};

function FormAddList({addList}: FormList) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name === '') {
      return;
    }
    addList(name);
    setName('');
  };

  const textHandler = (enteredName: string) => {
    setName(enteredName);
  };
  return (
    <View style={styles.addListContainer}>
      <TextInput
        style={styles.AddListTextInput}
        value={name}
        onChangeText={textHandler}
        defaultValue="Title of your list?"
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Image source={require('./images/add-big-button.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
  },
  AddListTextInput: {
    height: 40,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  addListTouchable: {
    color: 'blue',
    padding: 5,
    fontSize: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
});

export default FormAddList;
