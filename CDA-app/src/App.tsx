import React from 'react';
import { AuthContext } from 'contexts/AuthContext';
import AppAuthenticated from 'views/AppAuthenticated/AppAuthenticated';
import AppUnauthenticated from 'views/AppUnauthenticated/AppUnauthenticated';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { useTranslation } from 'react-i18next';
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  // const [t] = useTranslation();
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
