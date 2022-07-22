import React, { FC } from 'react';
import './AppUnauthenticated.scss';
import { Login } from '../Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import { GlobeIcon } from '@heroicons/react/solid';

interface AppUnauthenticatedProps {}

const AppUnauthenticated: FC<AppUnauthenticatedProps> = () => (
  <div className="w-full h-screen bg-light-base flex justify-center items-center">
    {/* Installer un selecteur de language de type dropdown */}
    <GlobeIcon className="absolute top-4 right-4 w-10 text-emerald-600 cursor-pointer hover:animate-spin" />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<>Forgot Password</>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </div>
);

export default AppUnauthenticated;
