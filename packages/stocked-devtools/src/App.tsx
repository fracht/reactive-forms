import { useEffect, useReducer } from 'react';
import { ThemeProvider } from '@mui/material';

import { AppState, AppStateContext } from './components/AppStateContext';
import { PlaybackBar } from './components/PlaybackBar';
import { GraphTab } from './pages/GraphTab';
import { BatchUpdate, parseStateTree } from './utils/parseStateTree';
import { theme } from './theme';

import classes from './App.module.scss';

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

type Action = NewStockAction | UpdatedStockAction | RefreshStockAction;

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
            break;
        case StockEvents.REFRESH:
            return { stocks: {} };
        default:
            // eslint-disable-next-line no-console
            console.warn('Unkown event got:', action);
            break;
    }

    return { ...state };
};

const App = () => {
    const [appState, dispatch] = useReducer(reducer, { stocks: {} });

    useEffect(() => {
        window.addEventListener('message', (message) => {
            if (Object.values(StockEvents).includes(message.data.event)) {
                dispatch(message.data as Action);
            }
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <AppStateContext.Provider value={appState}>
                <div className={classes['app']}>
                    <GraphTab />
                    <PlaybackBar className={classes['app__playback-bar']} />
                    {Object.values(appState.stocks).map((value) => value.name)}
                </div>
            </AppStateContext.Provider>
        </ThemeProvider>
    );
};

export default App;
