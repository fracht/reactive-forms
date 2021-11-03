import { createContext } from 'react';

import { StockInfo } from '../utils/StockInfo';

export const AppStateContext = createContext<AppState>({ stocks: {} });

export type AppState = {
    stocks: Record<number, StockInfo>;
};
