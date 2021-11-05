import { ThemeProvider } from '@mui/material';

import { AppStateContext, useAppStateStorage } from './components/AppStateContext';
import { ListOfStocks } from './components/ListOfStocks';
import { PlaybackBar } from './components/PlaybackBar';
import { GraphTab } from './pages/GraphTab';
import { theme } from './theme';

import classes from './App.module.scss';

const App = () => {
    const [appState, dispatch] = useAppStateStorage();

    return (
        <ThemeProvider theme={theme}>
            <AppStateContext.Provider value={{ ...appState, dispatch }}>
                <div className={classes['app']}>
                    <GraphTab />
                    <PlaybackBar className={classes['app__playback-bar']} />
                    <ListOfStocks />
                </div>
            </AppStateContext.Provider>
        </ThemeProvider>
    );
};

export default App;
