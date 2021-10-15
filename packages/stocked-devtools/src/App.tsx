import { PlaybackBar } from './components/PlaybackBar';
import { GraphTab } from './pages/GraphTab';

import classes from './App.module.scss';

const App = () => {
    return (
        <div className={classes['app']}>
            <GraphTab />
            <PlaybackBar className={classes['app__playback-bar']} />
        </div>
    );
};

export default App;
