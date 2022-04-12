import React, { FC } from 'react';

import './Login.scss';

interface LoginProps {}
export const Login: FC<LoginProps> = ({ children }) => (
  <div className="flex flex-wrap w-full h-screen">{children}</div>
);
