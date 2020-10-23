import React from 'react';
import Morfix, { TextFieldConfig, useDefaultFieldContext, useSubmitAction, useTextField } from 'morfix';

const TestField = (props: TextFieldConfig) => {
    const [field, { error, touched }] = useTextField(props);

    return (
        <div>
            <input {...field} />
            {touched && error && <span>{error}</span>}
        </div>
    );
};

const ObjField = (props: { name: string }) => {
    const {
        value,
        control: { setValue }
    } = useDefaultFieldContext<{ a: string }>(props);

    return (
        <div>
            {value?.a}
            <button onClick={() => setValue({ a: 'LOL!!!' })}>Hello</button>
        </div>
    );
};

const SubmitButton = () => {
    const onClick = useSubmitAction(() => {
        // console.log(values);
        return Promise.resolve();
    });

    return <button onClick={onClick}>Hello</button>;
};

const App = () => {
    return (
        <Morfix
            initialValues={{
                h: {
                    a: '',
                    c: 'asdf'
                },
                a: 'asdf',
                b: 'hello'
            }}
        >
            <div>
                <h2>Hello</h2>
                <ObjField name="h" />
                <TestField
                    validator={(value) => (value.length === 0 ? { mrfxError: 'Required' } : undefined)}
                    name="h.a"
                />
                <TestField name="h.c" />
                <TestField name="b" />
                <TestField name="h.a" />
                <SubmitButton />
            </div>
        </Morfix>
    );
};

export default App;
