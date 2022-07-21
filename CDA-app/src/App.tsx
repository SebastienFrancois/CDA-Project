import React from 'react';
import { AuthContext } from 'contexts/AuthContext';
import AppAuthenticated from 'views/AppAuthenticated/AppAuthenticated';
import AppUnauthenticated from 'views/AppUnauthenticated/AppUnauthenticated';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access-token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const { isLogged } = React.useContext(AuthContext);

  return (
    <ApolloProvider client={client}>
      <div className="overflow-hidden h-screen ">
        {isLogged ? <AppAuthenticated /> : <AppUnauthenticated />}
      </div>
    </ApolloProvider>
  );
}

export default App;
