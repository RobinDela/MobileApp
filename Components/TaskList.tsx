import React, {useState} from 'react';
import type {FunctionComponent} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import type {Task} from './typesFile';
import SingleTask from './SingleTask';

type TasksListProps = {
  listId: string;
  tasks: Task[];
  addTask: (id: string, taskName: string) => void;
  deleteTask: (id: string, taskId: string) => void;
  toggleTask: (id: string, taskId: string) => void;
  editTaskName: (id: string, taskId: string, newTaskName: string) => void;
};

const TaskList: FunctionComponent<TasksListProps> = ({
  addTask,
  deleteTask,
  toggleTask,
  editTaskName,
  ...props
}) => {
  const [nameOfTask, setNameOfTask] = useState('');
  console.log('name', nameOfTask);

  const textHandler = (enteredName: string) => {
    setNameOfTask(enteredName);
    console.log('test', enteredName);
  };

  const handleSubmitTask = () => {
    if (nameOfTask === '') {
      return;
    }

    addTask(props.listId, nameOfTask);
    setNameOfTask('');
  };

  return (
    <View style={styles.tasksListContainer}>
      {props.tasks.map(task => (
        <SingleTask
          key={task.id}
          task={task}
          listId={props.listId}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editTaskName={editTaskName}
        />
      ))}
      <View style={styles.taskInputContainer}>
        <TextInput
          style={styles.tasksTextInput}
          value={nameOfTask}
          onChangeText={textHandler}
          placeholder="Write a task to do"
        />
        <TouchableOpacity onPress={handleSubmitTask}>
          <Image source={require('./images/add-button.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tasksListContainer: {
    borderRadius: 8,
    backgroundColor: '#00ffff',
  },

  taskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '2%',
  },
  tasksTextInput: {
    fontSize: 20,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: '80%',
    backgroundColor: 'white',
  },
  addTaskTouchable: {
    color: 'blue',
    padding: 5,
    fontSize: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
});
export default TaskList;
