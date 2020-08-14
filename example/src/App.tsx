import React from 'react';

import Morfix, { useDefaultFieldContext } from 'morfix';

const StringField = React.memo(({ name }: { name: string }) => {
    const [{ value }, { setValue }] = useDefaultFieldContext<string>(name);
    return <input value={value} onChange={(e) => setValue(e.target.value)} />;
});

const App = () => {
    return (
        <Morfix
            initialValues={{
                hello: 'It works!',
                test: {
                    deep: {
                        value: 'This is deep value test'
                    }
                }
            }}
        >
            {({ values }) => (
                <React.Fragment>
                    <h2>Hello world</h2>
                    <p>this is Morfix example</p>
                    <p>
                        {values.hello}, {values.test.deep.value}
                    </p>
                    <StringField name="hello" />
                    <StringField name="test.deep.value" />
                </React.Fragment>
            )}
        </Morfix>
    );
};

export default App;
