/* eslint-disable react/no-unescaped-entities */
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import React, { FC, useState } from 'react';
// eslint-disable-next-line import/named
import { UseFormRegister } from 'react-hook-form';
import './InputBasic.scss';

export interface InputBasicProps {
  type: string;
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  style?: 'light';
  register: UseFormRegister<any>;
}

const InputBasic: FC<InputBasicProps> = ({
  type,
  label,
  name,
  placeholder,
  error,
  required = false,
  register,
  style,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col space-y-2">
      <label
        className={`text-medium font-medium first-letter:capitalize ${
          style === 'light' ? 'text-white' : 'text-slate-700'
        }`}
      >
        {label}
        {required ? ' *' : ''}
      </label>
      {type === 'textarea' ? (
        <>
          <textarea
            {...register(name)}
            required={required}
            className=" bg-white max-h-52 rounded p-3 w-full drop-shadow-lg focus:outline-secondary text-medium"
            placeholder={placeholder ? placeholder : ''}
            rows={5}
            cols={33}
          />
          <span className="text-slate-400 text-right">0/500 characters</span>
        </>
      ) : (
        <div className="flex">
          <input
            {...register(name)}
            required={required}
            type={showPassword ? 'text' : type}
            minLength={type === 'password' ? 8 : 0}
            className=" bg-white h-auto rounded p-3 w-full drop-shadow-lg focus:outline-secondary text-medium"
            placeholder={placeholder ? placeholder : ''}
          />
          {type === 'password' ? (
            showPassword ? (
              <EyeIcon
                className=" z-10 w-4 -ml-8 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeOffIcon
                className=" z-10 w-4 -ml-8 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )
          ) : (
            ''
          )}
        </div>
      )}
      {error && <span className="text-red-600 text-base">{error}</span>}
    </div>
  );
};

export default InputBasic;
