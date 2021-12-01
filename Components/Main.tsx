import {useQuery, useMutation} from '@apollo/client';
import {
  CREATE_LIST_MUTATION,
  DELETE_LIST_MUTATION,
  EDIT_TASK_NAME_MUTATION,
  DELETE_TASK_MUTATION,
  TOGGLE_TASK_MUTATION,
  ADD_TASK_MUTATION,
  EDIT_LIST_MUTATION,
} from './GraphQL/Mutations';
import {LOAD_LISTS} from './GraphQL/Queries';
import React from 'react';

import {
  View,
  Text,
  Image,
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
  const {data, loading} = useQuery(LOAD_LISTS);
  const [addListMut] = useMutation(CREATE_LIST_MUTATION, {
    refetchQueries: [LOAD_LISTS, 'getAllLists'],
  });
  const [deleteListMut] = useMutation(DELETE_LIST_MUTATION, {
    refetchQueries: [LOAD_LISTS, 'getAllLists'],
  });
  const [deleteTaskMut] = useMutation(DELETE_TASK_MUTATION, {
    refetchQueries: [LOAD_LISTS, 'getAllLists'],
  });
  const [toggleTaskMut] = useMutation(TOGGLE_TASK_MUTATION, {
    refetchQueries: [LOAD_LISTS, 'getAllLists'],
  });
  const [editListNameMut] = useMutation(EDIT_LIST_MUTATION, {
    refetchQueries: [LOAD_LISTS, 'getAllLists'],
  });
  const [addTaskMut] = useMutation(ADD_TASK_MUTATION, {
    refetchQueries: [LOAD_LISTS, 'getAllLists'],
  });
  const [editTaskNameMut] = useMutation(EDIT_TASK_NAME_MUTATION, {
    refetchQueries: [LOAD_LISTS, 'getAllLists'],
  });

  // const [addListMut] = useMutation(CREATE_LIST_MUTATION, {
  //   update: (cache, {data: returnData}, {variables}) => {
  //     if (!returnData) return;
  //     const lists = cache.readQuery({query: LOAD_LISTS, variables});

  //     cache.writeQuery({
  //       query: LOAD_LISTS,
  //       variables,
  //       data: {getAllLists: [...lists.getAllLists, returnData.addList]},
  //     });
  //   },
  // });
  // const [deleteListMut] = useMutation(DELETE_LIST_MUTATION, {
  //   update: (cache, {data: returnData}, {variables}) => {
  //     if (!returnData) return;
  //     const lists = cache.readQuery({query: LOAD_LISTS, variables});

  //     cache.writeQuery({
  //       query: LOAD_LISTS,
  //       variables,
  //       data: {getAllLists: [...lists.getAllLists, returnData.deleteList]},
  //     });
  //   },
  // });

  // const [deleteTaskMut] = useMutation(DELETE_TASK_MUTATION, {
  //   update: (cache, {data: returnData}, {variables}) => {
  //     if (!returnData) return;
  //     const lists = cache.readQuery({query: LOAD_LISTS, variables});
  //     const newList = lists.getAllLists.map((list: any) => {
  //       if (list.id === variables.listId) {
  //         return {
  //           ...list,
  //           tasks: [...list.tasks, returnData.deleteTask],
  //         };
  //       }
  //       return list;
  //     });

  //     cache.writeQuery({
  //       query: LOAD_LISTS,
  //       variables,
  //       data: {getAllLists: newList},
  //     });
  //   },
  // });

  //const [toggleTaskMut] = useMutation(TOGGLE_TASK_MUTATION);

  //const [editListNameMut] = useMutation(EDIT_LIST_MUTATION);
  // const [addTaskMut] = useMutation(ADD_TASK_MUTATION, {
  //   update: (cache, {data: returnData}, {variables}) => {
  //     if (!returnData) return;
  //     const lists = cache.readQuery({query: LOAD_LISTS, variables});
  //     const newList = lists.getAllLists.map((list: any) => {
  //       if (list.id === variables.listId) {
  //         return {
  //           ...list,
  //           tasks: [...list.tasks, returnData.addTask],
  //         };
  //       }
  //       return list;
  //     });

  //     cache.writeQuery({
  //       query: LOAD_LISTS,
  //       variables,
  //       data: {getAllLists: newList},
  //     });
  //   },
  // });

  //const [editTaskNameMut] = useMutation(EDIT_TASK_NAME_MUTATION);

  const addList = (name: string) => {
    addListMut({
      variables: {
        name,
      },
    });
  };

  const deleteList = (id: string) => {
    deleteListMut({
      variables: {
        id,
      },
    });
  };

  const deleteTask = (listId: string, taskId: string) => {
    deleteTaskMut({
      variables: {
        listId,
        taskId,
      },
    });
  };

  const toggleTask = (listId: string, taskId: string) => {
    toggleTaskMut({
      variables: {
        listId,
        taskId,
      },
    });
  };

  const editListName = (id: string, newName: string) => {
    editListNameMut({
      variables: {
        name: newName,
        id,
      },
    });
  };

  const addTask = (id: string, name: string) => {
    addTaskMut({
      variables: {
        listId: id,
        name,
      },
    });
  };

  const editTaskName = (
    listId: string,
    taskId: string,
    newTaskName: string,
  ) => {
    editTaskNameMut({
      variables: {
        listId,
        taskId,
        newName: newTaskName,
      },
    });
  };
  console.log('data', data);
  console.log('loading', loading);

  return (
    <View accessible={true}>
      <View style={styles.header}>
        <Text style={styles.titleTop}>What needs to be done?</Text>
        <FormAddList addList={addList} />
      </View>
      <ScrollView style={styles.listsContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Text style={styles.listTitle}>
            {loading ? (
              <Image source={require('./images/delete.png')} />
            ) : (
              data.getAllLists.map((list: List) => (
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
              ))
            )}
          </Text>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
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
  listsContainer: {
    marginBottom: 200,
  },
  title: {
    textAlign: 'center',
  },
  listTitle: {
    paddingLeft: 5,
  },
  titleTop: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Main;
