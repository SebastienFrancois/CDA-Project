import { useEffect, useState, useCallback } from 'react';

type InitialState = Record<string, unknown> | [] | string | number;
type ReturnType = [
  InitialState,
  React.Dispatch<React.SetStateAction<string | number | Record<string, unknown> | []>>,
];

const useLocalStorage = (initialState: InitialState, key: string): ReturnType => {
  const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);
  const updatedSetValue = useCallback(
    (newValue) => {
      if (newValue === initialState || typeof newValue === 'undefined') {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, newValue);
      }
      setValue(newValue ?? initialState);
    },
    [initialState, key],
  );
  return [value, updatedSetValue];
};

export default useLocalStorage;
