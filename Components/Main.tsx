import {customAlphabet} from 'nanoid/non-secure';

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import FormAddList from './FormAddList';
import Todo from './Todo';
import type {List} from './typesFile';

const Main = () => {
  const [lists, setLists] = useState<List[]>([
    {
      id: 'list-0',
      name: 'Example 1',
      tasks: [{name: 'task test 1', completed: false, id: 'testId'}],
    },
    {
      id: 'list-1',
      name: 'Example 2',
      tasks: [{name: 'task test 2', completed: false, id: 'testId2'}],
    },
    {
      id: 'list-2',
      name: 'Example 3',
      tasks: [
        {name: 'task test 3', completed: true, id: 'testId3'},
        {name: 'task test 3.1', completed: false, id: 'testId3.1'},
        {name: 'task test 3.2', completed: false, id: 'testId3.2'},
      ],
    },
  ]);
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

  console.log('lists', lists);

  const addList = (name: string) => {
    const newList = {
      id: nanoid(),
      name,
      tasks: [],
    };
    setLists([...lists, newList]);
  };

  const deleteList = (id: string) => {
    const remainingLists = lists.filter(list => id !== list.id);
    setLists(remainingLists);
  };

  const deleteTask = (listId: string, taskId: string) => {
    const listIndex = lists.findIndex(list => list.id === listId);
    const list = lists[listIndex];
    const newList = {
      ...list,
      tasks: list.tasks.filter(task => task.id !== taskId),
    };

    const newLists = [
      ...lists.slice(0, listIndex),
      newList,
      ...lists.slice(listIndex + 1),
    ];

    setLists(newLists);
  };

  const toggleTask = (listId: string, taskId: string) => {
    const newListsToggled = lists.map(listItem => {
      if (listItem.id === listId) {
        return {
          ...listItem,
          tasks: listItem.tasks.map(task => {
            if (task.id === taskId) {
              return {...task, completed: !task.completed};
            }
            return task;
          }),
        };
      }
      return listItem;
    });
    setLists(newListsToggled);
  };

  const editListName = (id: string, newName: string) => {
    const editedList = lists.map(list => {
      if (id === list.id) {
        return {...list, name: newName};
      }
      return list;
    });
    setLists(editedList);
  };

  const addTask = (id: string, name: string) => {
    const newListWithTask = lists.map(list => {
      if (id === list.id) {
        return {
          ...list,
          tasks: [...list.tasks, {name, completed: false, id: nanoid()}],
        };
      }
      return list;
    });
    setLists(newListWithTask);
  };

  const editTaskName = (
    listId: string,
    taskId: string,
    newTaskName: string,
  ) => {
    const newEditedListWithTask = lists.map(listItem => {
      if (listItem.id === listId) {
        return {
          ...listItem,
          tasks: listItem.tasks.map(task => {
            if (task.id === taskId) {
              return {...task, name: newTaskName};
            }
            return task;
          }),
        };
      }
      return listItem;
    });
    setLists(newEditedListWithTask);
  };

  return (
    <View accessible={true}>
      <View style={styles.background}>
        <Text style={styles.titleTop}>What needs to be done?</Text>
        <FormAddList addList={addList} />
      </View>
      <ScrollView>
        <KeyboardAvoidingView>
          {/* behavior={Platform.OS === 'ios' ? 'padding' : 'height'} */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Text style={styles.listTitle}>
              {' '}
              {lists.map(list => (
                <Todo
                  key={list.id}
                  list={list}
                  deleteList={deleteList}
                  editListName={editListName}
                  addTask={addTask}
                  deleteTask={deleteTask}
                  toggleTask={toggleTask}
                  editTaskName={editTaskName}
                />
              ))}
            </Text>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#06daf0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  title: {
    textAlign: 'center',
  },
  listTitle: {
    paddingLeft: 5,
  },
  titleTop: {
    fontSize: 30,
    textAlign: 'center',
  },
});
export default Main;
