/* eslint-disable no-console */
import React, { FC, ChangeEvent } from 'react';
import profilePicture from './../../assets/png/Image.png';
import './DevCheckbox.scss';

interface IProps {
  data: any;
  developpers: string[] | null;
  setDeveloppers: (arr: string[]) => void;
}

const DevCheckbox: FC<IProps> = ({ data, developpers, setDeveloppers }) => {
  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setDeveloppers([...(developpers ? developpers : []), e.target.value]);
    }
    if (!e.target.checked) {
      console.log('should remove id');
      setDeveloppers([
        ...(developpers ? developpers : []).filter((dev: string) => dev !== e.target.value),
      ]);
    }
  };
  console.log(data);
  return (
    data && (
      <div className="scroll-smooth bg-white grow rounded p-3 w-full drop-shadow-lg focus:outline-secondary text-medium flex flex-col gap-3">
        {data?.getUsers?.length &&
          data.getUsers.map((user: IUser) => {
            console.log(user._id);
            return (
              <label
                htmlFor={user._id}
                key={user._id}
                className="flex gap-2 items-center capitalize"
              >
                <input
                  type="checkbox"
                  name={user._id}
                  id={user._id}
                  value={user._id}
                  className="dev-checkbox"
                  checked={developpers?.includes(user._id)}
                  onChange={handleCheckBox}
                />
                <div className="h-14 w-14 rounded-full overflow-hidden">
                  <img src={profilePicture} alt="picture" />
                </div>
                {user.username}
              </label>
            );
          })}
      </div>
    )
  );
};

export default DevCheckbox;
