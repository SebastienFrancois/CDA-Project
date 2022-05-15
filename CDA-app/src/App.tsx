import React from 'react';
import { AuthContext } from 'contexts/AuthContext';
import AppAuthenticated from 'views/AppAuthenticated/AppAuthenticated';
import AppUnauthenticated from 'views/AppUnauthenticated/AppUnauthenticated';
import { useTranslation } from 'react-i18next';

function App() {
  const [t] = useTranslation();
  const { isLogged } = React.useContext(AuthContext);

  return (
    <div className="overflow-hidden h-screen ">
      {/* {isLogged ? <AppAuthenticated /> : <AppUnauthenticated />} */}
      {isLogged ? <h1>{t('common:test')}</h1> : <h1>{t('common:test')}</h1>}
    </div>
  );
}

export default App;
