import React, { FC } from 'react';
import './AppUnauthenticated.scss';
import { Login } from '../Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';

interface AppUnauthenticatedProps {}

const AppUnauthenticated: FC<AppUnauthenticatedProps> = () => (
  <div className="w-full h-screen bg-light-base flex justify-center items-center">
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<>Forgot Password</>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </div>
);

export default AppUnauthenticated;
