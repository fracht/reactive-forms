import { createContext } from 'react';
import { MorfixContextType } from './types/MorfixContextType';

export const MorfixContext = createContext({} as MorfixContextType<unknown>);
