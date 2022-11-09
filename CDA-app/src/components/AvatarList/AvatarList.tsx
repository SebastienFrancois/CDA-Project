/* eslint-disable no-console */
import React, { FC, useState } from 'react';

import DevCheckbox from './../DevCheckbox/DevCheckbox';

import profilePicture from './../../assets/png/Image.png';
import './AvatarList.scss';

interface AvatarListProps {
  allUsers: any;
  developpers: string[];
  setDeveloppers: (arr: string[]) => void;
  updateDev: boolean;
  setUpdateDev: (bool: boolean) => void;
}

const AvatarList: FC<AvatarListProps> = ({
  allUsers,
  developpers,
  setDeveloppers,
  updateDev,
  setUpdateDev,
}) => {
  return developpers.length && !updateDev ? (
    <div
      className="avatars flex"
      onClick={(e) => {
        e.preventDefault();
        setUpdateDev(!updateDev);
      }}
    >
      {developpers.map((devId: string) => {
        return (
          <div className="avatars__item" key={devId}>
            <div className="avatars__image">
              <img
                src={profilePicture}
                className="rounded-full"
                alt="profile picture"
                title={allUsers.getUsers.filter((user: IUser) => user._id === devId)[0].username}
              />
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    //form pour update les users
    <DevCheckbox data={allUsers} developpers={developpers} setDeveloppers={setDeveloppers} />
  );
};

export default AvatarList;
