import React from 'react';
import Morfix, { useDefaultFieldContext } from 'morfix';

const TestField = (props: { name: string }) => {
    const [value, setValue] = useDefaultFieldContext<string>(props);

    return <input value={value ?? ''} onChange={(e) => setValue(e.target.value)} />;
};

const ObjField = (props: { name: string }) => {
    const [value, setValue] = useDefaultFieldContext<{ a: string }>(props);

    return (
        <div>
            {value?.a}
            <button onClick={() => setValue({ a: 'LOL!!!' })}>Hello</button>
        </div>
    );
};

const App = () => {
    return (
        <Morfix
            initialValues={{
                h: {
                    a: 'asdf',
                    c: 'asdf'
                },
                a: 'asdf',
                b: 'hello'
            }}
        >
            <div>
                <h2>Hello</h2>
                <ObjField name="h" />
                <TestField name="h.a" />
                <TestField name="h.c" />
                <TestField name="b" />
            </div>
        </Morfix>
    );
};

export default App;
