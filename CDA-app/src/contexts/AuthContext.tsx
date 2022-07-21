import React, { ReactChild } from 'react';
import axios from 'axios';
import setRequestInterceptor from 'services/interceptor';

interface AuthContextInterface {
  isLogged: boolean;
  onLogout: () => void;
  onLogin: (userToken: string) => void;
}

export const AuthContextDefaultValue: AuthContextInterface = {
  isLogged: false,
  onLogout: () => {},
  onLogin: () => {},
};

const getToken = () => {
  const access = localStorage.getItem('access-token');
  if (access) {
    return access;
  }
  return;
};

export const AuthContext = React.createContext<AuthContextInterface>(AuthContextDefaultValue);

export function AuthContextProvider({ children }: { children: ReactChild }) {
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [token, setToken] = React.useState(getToken());

  const onLogout = () => {
    localStorage.removeItem('access-token');
    setIsLogged(false);
  };

  const onLogin = (userToken: string) => {
    localStorage.setItem('access-token', userToken);
    setToken(userToken);
    setIsLogged(true);
  };

  React.useEffect(() => {
    if (!token) {
      return setIsLogged(false);
    }
    setIsLogged(true);
  }, [token, setIsLogged]);

  const value = { isLogged, onLogout, onLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
