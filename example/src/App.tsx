import React from 'react';
import Morfix, { TextFieldConfig, useObjectField, useSubmitAction, useTextField } from 'morfix';

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
    const { values, errors, setDeepValue, setDeepError } = useObjectField<{ a: string }>(props);

    return (
        <div>
            {values?.a}
            {errors?.a?.mrfxError}
            <button onClick={() => setDeepValue('a', 'LOL!!!')}>Hello</button>
            <button onClick={() => setDeepError('a', { mrfxError: 'fff' })}>asdf</button>
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
