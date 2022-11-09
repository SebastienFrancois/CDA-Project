import React, { FC, ChangeEvent } from 'react';
import './ManagerSelect.scss';

interface ManagerSelectProps {
  data: any;
  manager: string;
  setManager: (user: string) => void;
}

const ManagerSelect: FC<ManagerSelectProps> = ({ data, manager, setManager }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setManager(e.target.value);
  };

  return (
    data && (
      <div>
        <label
          htmlFor="projectManager"
          className="text-medium font-medium first-letter:capitalize text-slate-700"
        >
          Project Manager *
          <select
            id="projectManager"
            className="bg-white max-h-52 rounded p-3 w-full drop-shadow-lg focus:outline-secondary text-medium capitalize"
            onChange={handleChange}
            value={manager}
            name="projectManager"
          >
            <option value="">---Select a Project manager---</option>
            {data.getUsers.map((user: IUser) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </label>
      </div>
    )
  );
};

export default ManagerSelect;
