import {gql} from '@apollo/client';

export const CREATE_LIST_MUTATION = gql`
  mutation addListMut($name: String!) {
    addList(name: $name) {
      id
      name
      tasks {
        name
        id
        completed
      }
    }
  }
`;

export const EDIT_LIST_MUTATION = gql`
  mutation editListNameMut($name: String!, $id: String!) {
    editListName(name: $name, id: $id) {
      name
      id
    }
  }
`;

export const DELETE_LIST_MUTATION = gql`
  mutation deleteListMut($id: String!) {
    deleteList(id: $id)
  }
`;
export const ADD_TASK_MUTATION = gql`
  mutation addTaskMut($listId: String!, $name: String!) {
    addTask(listId: $listId, name: $name) {
      id
      name
      completed
    }
  }
`;

export const EDIT_TASK_NAME_MUTATION = gql`
  mutation editTaskNameMut(
    $listId: String!
    $taskId: String!
    $newName: String!
  ) {
    editTaskName(listId: $listId, taskId: $taskId, newName: $newName) {
      name
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation deleteTaskMut($listId: String!, $taskId: String!) {
    deleteTask(listId: $listId, taskId: $taskId)
  }
`;

export const TOGGLE_TASK_MUTATION = gql`
  mutation toggleTaskMut($listId: String!, $taskId: String!) {
    toggleTask(listId: $listId, taskId: $taskId) {
      name
    }
  }
`;
