import React, { ReactChild } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

interface AuthContextInterface {
  isLogged: boolean;
  onLogout: () => void;
  onLogin: (userToken: string) => void;
  currentUser: { [key: string]: string } | null;
}

export const AuthContextDefaultValue: AuthContextInterface = {
  isLogged: false,
  onLogout: () => {},
  onLogin: () => {},
  currentUser: {},
};

const getToken = () => {
  const access = localStorage.getItem('access-token');
  if (access) {
    return access;
  }
  return;
};

const getCurrentUser = () => {
  const user = localStorage.getItem('current-user');
  if (user) {
    return JSON.parse(user);
  }
  return;
};

export const AuthContext = React.createContext<AuthContextInterface>(AuthContextDefaultValue);

export function AuthContextProvider({ children }: { children: ReactChild }) {
  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [token, setToken] = React.useState(getToken());
  const [currentUser, setCurrentUser] = React.useState(getCurrentUser());

  const onLogout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('current-user');
    setIsLogged(false);
  };

  const onLogin = (userToken: string) => {
    const decodedToken: { data: string } = jwt_decode(userToken);
    if (decodedToken) {
      localStorage.setItem('current-user', JSON.stringify(decodedToken.data));
      setCurrentUser(decodedToken.data);
    }
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

  const value = { isLogged, onLogout, onLogin, currentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
