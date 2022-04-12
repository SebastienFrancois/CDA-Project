import React from 'react';
import { AuthContext } from 'contexts/AuthContext';
import AppAuthenticated from 'views/AppAuthenticated/AppAuthenticated';
import AppUnauthenticated from 'views/AppUnauthenticated/AppUnauthenticated';

function App() {
  const { isLogged } = React.useContext(AuthContext);

  return (
    <div className="overflow-hidden h-screen ">
      {/* {isLogged ? <AppAuthenticated /> : <AppUnauthenticated />} */}
      {isLogged ? <h1>Is Logged</h1> : <h1>Please log in</h1>}
    </div>
  );
}

export default App;
