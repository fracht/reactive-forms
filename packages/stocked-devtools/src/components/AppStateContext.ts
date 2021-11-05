import { createContext, Dispatch, useEffect, useReducer } from 'react';

import { BatchUpdate, parseStateTree } from '../utils/parseStateTree';
import { StockInfo } from '../utils/StockInfo';

enum StockEvents {
    NEW = 'new',
    UPDATE = 'update',
    REFRESH = 'refresh'
}

type NewStockAction = {
    event: StockEvents.NEW;
    data: {
        id: number;
        data: object;
    };
};

type UpdatedStockAction = {
    event: StockEvents.UPDATE;
    data: {
        id: number;
        data: BatchUpdate;
    };
};

type RefreshStockAction = {
    event: StockEvents.REFRESH;
};

export enum AppEvents {
    PICK_STOCK = 'stockPicked'
}

export type PickStockAction = {
    event: AppEvents.PICK_STOCK;
    data: number;
};

type Action = NewStockAction | UpdatedStockAction | RefreshStockAction | PickStockAction;

const reducer = (state: AppState, action: Action): AppState => {
    switch (action.event) {
        case StockEvents.UPDATE:
            if (action.data.id in state.stocks) {
                state.stocks[action.data.id].stateHistory.push(parseStateTree(action.data.data));
            } else {
                // eslint-disable-next-line no-console
                console.warn('Unknown stock got on update -', action);
            }
            break;
        case StockEvents.NEW:
            state.stocks[action.data.id] = {
                name: `Stock #${action.data.id}`,
                id: action.data.id,
                stateHistory: [parseStateTree({ values: action.data.data, origin: ['#notExisting'], paths: [] })]
            };

            if (state.selectedStockId === -1) {
                state.selectedStockId = action.data.id;
            }

            break;
        case StockEvents.REFRESH:
            return { stocks: {}, selectedStockId: -1 };
        case AppEvents.PICK_STOCK:
            state.selectedStockId = action.data;
            break;
        default:
            // eslint-disable-next-line no-console
            console.warn('Unkown event got:', action);
            break;
    }

    return { ...state };
};

export const AppStateContext = createContext<AppState & { dispatch: Dispatch<Action> }>({
    stocks: {},
    selectedStockId: -1,
    dispatch: () => {
        /** empty fn */
    }
});

export type AppState = {
    stocks: Record<number, StockInfo>;
    selectedStockId: number;
};

export const useAppStateStorage = (): [AppState, Dispatch<Action>] => {
    const [appState, dispatch] = useReducer(reducer, { stocks: {}, selectedStockId: -1 });

    useEffect(() => {
        window.addEventListener('message', (message) => {
            if (Object.values(StockEvents).includes(message.data.event)) {
                dispatch(message.data as Action);
            }
        });
    }, []);

    return [appState, dispatch];
};
