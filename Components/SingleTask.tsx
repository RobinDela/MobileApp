import type {FunctionComponent} from 'react';
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import type {Task} from './typesFile';

type TaskProps = {
  listId: string;
  task: Task;

  deleteTask: (id: string, taskId: string) => void;
  toggleTask: (id: string, taskId: string) => void;
  editTaskName: (id: string, taskId: string, newTaskName: string) => void;
};

const SingleTask: FunctionComponent<TaskProps> = ({
  deleteTask,
  toggleTask,
  editTaskName,

  task,
  listId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(task.name);
  const editTaskMode = (): void => {
    setIsEditing(!isEditing);
    console.log('editTaskMode', isEditing);
  };

  const newTaskNameHandler = (enteredTaskName: string) => {
    setNewTaskName(enteredTaskName);
    console.log('test new task name', enteredTaskName);
  };

  const handleSubmitEditedTask = () => {
    editTaskName(listId, task.id, newTaskName);
    setNewTaskName(newTaskName);
    setIsEditing(!isEditing);
  };

  const viewSingleTaskTemplate = (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTask(listId, task.id)}>
        <Image
          source={
            task.completed
              ? require('./images/checkbox-full.png')
              : require('./images/checkbox-empty.png')
          }
        />
      </TouchableOpacity>

      <Text
        onPress={editTaskMode}
        style={task.completed ? styles.taskTextLineThrough : styles.taskText}>
        {task.name}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(listId, task.id)}>
        <Image source={require('./images/delete.png')} />
      </TouchableOpacity>
    </View>
  );

  const editSingleTaskTemplate = (
    <View>
      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={() => toggleTask(listId, task.id)}>
          <Image source={require('./images/checkbox-empty.png')} />
        </TouchableOpacity>
        <TextInput
          style={styles.editTaskText}
          value={newTaskName}
          onChangeText={newTaskNameHandler}
          autoFocus={true}
          placeholder="New task name"
        />
        <TouchableOpacity onPress={() => deleteTask(listId, task.id)}>
          <Image source={require('./images/delete.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.editButtons}>
        <TouchableOpacity onPress={editTaskMode}>
          <Image source={require('./images/cancel.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmitEditedTask}>
          <Image source={require('./images/validate.png')} />
        </TouchableOpacity>
      </View>
      <Button title="confirm" onPress={handleSubmitEditedTask} />
    </View>
  );

  return <>{isEditing ? editSingleTaskTemplate : viewSingleTaskTemplate}</>;
};

const styles = StyleSheet.create({
  taskContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
  },
  taskText: {
    fontSize: 35,
    paddingLeft: 5,
  },
  editTaskText: {
    fontSize: 35,
    paddingLeft: 5,
    fontStyle: 'italic',
    color: 'blue',
  },
  taskTextLineThrough: {
    fontSize: 35,
    paddingLeft: 5,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  editButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  deleteText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
});

export default SingleTask;
