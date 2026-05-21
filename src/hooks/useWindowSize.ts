import { useContext } from 'react';
import { WindowSizeContext } from '../context/WindowSizeContext';

export function useWindowSize() {
  return useContext(WindowSizeContext);
}
