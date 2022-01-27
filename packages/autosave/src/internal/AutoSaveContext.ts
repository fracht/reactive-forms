import { createContext } from 'react';

import { AutoSaveService } from '../AutoSaveService';

export const AutoSaveContext = createContext<AutoSaveService<unknown> | undefined>(undefined);
