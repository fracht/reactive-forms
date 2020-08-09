import React from 'react';

import Morfix from 'morfix';

const App = () => {
    return (
        <Morfix
            initialValues={{
                hello: 'It works!'
            }}
        >
            {({ values }) => (
                <React.Fragment>
                    <h2>Hello world</h2>
                    <p>this is Morfix example</p>
                    <p>{values.hello}</p>
                </React.Fragment>
            )}
        </Morfix>
    );
};

export default App;
