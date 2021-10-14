import { GraphTab } from './pages/GraphTab';

import classes from './App.module.scss';

const App = () => {
    return (
        <div className={classes['app']}>
            <GraphTab />
        </div>
    );
};

export default App;
