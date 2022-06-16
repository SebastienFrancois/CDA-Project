/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import './InputBasic.scss';

interface InputBasicProps {
  type: string;
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  register: any;
}

const InputBasic: FC<InputBasicProps> = ({
  type,
  label,
  name,
  placeholder,
  error,
  required = false,
  register,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-medium font-medium first-letter:capitalize text-slate-700">
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
        <input
          {...register(name)}
          required={required}
          type={type}
          className=" bg-white h-auto rounded p-3 w-full drop-shadow-lg focus:outline-secondary text-medium"
          placeholder={placeholder ? placeholder : ''}
        />
      )}
      {error && <span className="text-red-600 text-base">{error}</span>}
    </div>
  );
};

export default InputBasic;
