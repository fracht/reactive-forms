import { ThemeProvider } from '@mui/material';

import { PlaybackBar } from './components/PlaybackBar';
import { GraphTab } from './pages/GraphTab';
import { theme } from './theme';

import classes from './App.module.scss';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className={classes['app']}>
                <GraphTab />
                <PlaybackBar className={classes['app__playback-bar']} />
            </div>
        </ThemeProvider>
    );
};

export default App;
