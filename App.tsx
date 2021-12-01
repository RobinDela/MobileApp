import React from 'react';
import KeyboardManager from 'react-native-keyboard-manager';
import {Platform, SafeAreaView} from 'react-native';
import Main from './Components/Main';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';
import {onError} from '@apollo/client/link/error';

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
}

const link = from([
  errorLink,
  new HttpLink({
    uri:
      Platform.OS === 'ios'
        ? 'http://localhost:4000/graphql'
        : 'http://10.0.2.2:4000/graphql',
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <Main />
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
