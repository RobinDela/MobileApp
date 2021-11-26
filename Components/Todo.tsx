import type {FunctionComponent} from 'react';
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import type {List} from './typesFile';
import TaskList from './TaskList';

type ListProps = {
  list: List;
  deleteTask: (id: string, taskId: string) => void;
  deleteList: (id: string) => void;
  editListName: (id: string, newName: string) => void;
  editTaskName: (id: string, taskId: string, newTaskName: string) => void;
  addTask: (id: string, taskName: string) => void;
  toggleTask: (id: string, taskId: string) => void;
};

const Todo: FunctionComponent<ListProps> = ({
  deleteList,
  editListName,
  addTask,
  deleteTask,
  toggleTask,
  editTaskName,
  list,
}) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(list.name);

  const handleSubmit = () => {
    editListName(list.id, newName);
    setNewName(newName);
    setEditing(!isEditing);
  };

  const editMode = () => {
    setEditing(!isEditing);
  };

  const newNameHandler = (enteredName: string) => {
    setNewName(enteredName);
    console.log('test new name', enteredName);
  };

  const EditingTemplate = (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit}>
          <Image source={require('./images/edit.png')} />
        </TouchableOpacity>
        <TouchableOpacity onLongPress={() => deleteList(list.id)}>
          <Image source={require('./images/delete-big.png')} />
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.editListInput}
          value={newName}
          onChangeText={newNameHandler}
          placeholder="Write your new name here"
        />
      </View>
      <View style={styles.editButtons}>
        <TouchableOpacity onPress={editMode}>
          <Image source={require('./images/cancel.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Image source={require('./images/validate.png')} />
        </TouchableOpacity>
      </View>
      <TaskList
        tasks={list.tasks}
        addTask={addTask}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTaskName={editTaskName}
        listId={list.id}
      />
    </View>
  );
  const ViewTemplate = (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={editMode}>
          <Image source={require('./images/edit.png')} />
        </TouchableOpacity>
        <TouchableOpacity onLongPress={() => deleteList(list.id)}>
          <Image source={require('./images/delete-big.png')} />
        </TouchableOpacity>
      </View>
      <Text onPress={editMode} style={styles.text}>
        {list.name}
      </Text>

      <TaskList
        tasks={list.tasks}
        addTask={addTask}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTaskName={editTaskName}
        listId={list.id}
      />
    </View>
  );
  return <View>{isEditing ? EditingTemplate : ViewTemplate}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#05aec0',

    borderRadius: 8,
    backgroundColor: '#00c1d7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,

    width: 380,
    minHeight: 200,
    marginLeft: 5,
    marginBottom: 30,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  editListInput: {
    fontSize: 40,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'blue',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Todo;
