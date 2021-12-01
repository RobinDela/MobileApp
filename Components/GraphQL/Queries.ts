import {gql} from '@apollo/client';

export const LOAD_LISTS = gql`
  query {
    getAllLists {
      id
      name
      tasks {
        id
        name
        completed
      }
    }
  }
`;
