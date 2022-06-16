import React, { ReactChild } from 'react';
import axios from 'axios';
import setRequestInterceptor from 'services/interceptor';

export type JwtToken = {
  access: string;
  refresh: string;
};

interface AuthContextInterface {
  isLogged: boolean;
  onLogout: () => void;
  onLogin: (userToken: JwtToken) => void;
}

export const AuthContextDefaultValue: AuthContextInterface = {
  isLogged: false,
  onLogout: () => {},
  onLogin: () => {},
};

const getToken = () => {
  const access = localStorage.getItem('access');
  const refresh = localStorage.getItem('refresh');
  if (access && refresh) {
    const userToken = {
      access: JSON.parse(access),
      refresh: JSON.parse(refresh),
    };
    axios.defaults.headers.common.Authorization = `Bearer ${userToken.access}`;
    return userToken;
  }
};

export const AuthContext = React.createContext<AuthContextInterface>(AuthContextDefaultValue);

export function AuthContextProvider({ children }: { children: ReactChild }) {
  const [isLogged, setIsLogged] = React.useState<boolean>(true);
  const [token, setToken] = React.useState(getToken());

  const onLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    axios.defaults.headers.common.Authorization = '';
    setToken(undefined);
    setIsLogged(false);
  };

  const onLogin = (userToken: JwtToken) => {
    localStorage.setItem('refresh', JSON.stringify(userToken.refresh));
    localStorage.setItem('access', JSON.stringify(userToken.access));
    axios.defaults.headers.common.Authorization = `Bearer ${userToken.access}`;
    setRequestInterceptor();
    setToken(userToken);
    setIsLogged(true);
  };

  React.useEffect(() => {
    if (token === undefined) {
      setIsLogged(false);
    }
    if (token && token?.access) {
      setIsLogged(true);
    }
  }, [token, setIsLogged]);

  const value = { isLogged: true, onLogout, onLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
