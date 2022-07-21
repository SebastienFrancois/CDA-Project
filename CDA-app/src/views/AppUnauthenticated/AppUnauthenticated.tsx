import React, { FC } from 'react';
import './AppUnauthenticated.scss';
import { Login } from '../Login/Login';

interface AppUnauthenticatedProps {}

const AppUnauthenticated: FC<AppUnauthenticatedProps> = () => (
  <div className="w-full h-screen bg-light-base flex justify-center items-center">
    <Login />
  </div>
);

export default AppUnauthenticated;
