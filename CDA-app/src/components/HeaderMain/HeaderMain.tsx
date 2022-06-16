import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import './HeaderMain.scss';

interface HeaderMainProps {}

const HeaderMain: FC<HeaderMainProps> = () => {
  const location = useLocation();
  const getBannerTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'My Dashboard';
      case '/create-project':
        return 'Create new project';
      case '/update-project':
        return 'Update your project';
      default:
        return '';
    }
  };
  const bannerTitle = getBannerTitle();

  return (
    <div className="flex w-full align-middle h-12 mb-4">
      <h1 className=" text-3xl my-4 text-primary font-medium flex">{bannerTitle}</h1>
    </div>
  );
};

export default HeaderMain;
