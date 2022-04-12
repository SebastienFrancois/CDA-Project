import React, { FC } from 'react';
import './AppUnauthenticated.scss';
import { Login } from '../Login/Login';

interface AppUnauthenticatedProps {}

const AppUnauthenticated: FC<AppUnauthenticatedProps> = () => (
  <div className="AppUnauthenticated bg-bckg-desktop bg-bottom bg-no-repeat bg-cover animate-fade-in-up">
    <Login>Login</Login>
  </div>
);

export default AppUnauthenticated;
