import React from 'react';

import Morfix, {
    ObjectField,
    ObjectFieldConfig,
    ObjectFieldProps
} from 'morfix';

const TestField = (config: ObjectFieldConfig) => (
    <ObjectField {...config}>
        {({ setDeepValue, value }: ObjectFieldProps<{ hello: string }>) => (
            <div>
                <button onClick={() => setDeepValue<string>('hello', 'asdf')}>
                    click me
                </button>
                {value.hello}
            </div>
        )}
    </ObjectField>
);

const App = () => {
    return (
        <Morfix
            initialValues={{
                testField: {
                    hello: 'aaaa'
                }
            }}
        >
            {({ values }) => (
                <React.Fragment>
                    <h2>Hello world</h2>
                    <p>this is Morfix example</p>
                    {values.testField.hello}
                    <TestField name="testField" />
                    {/* <StringField name="hello" />
                    <StringField name="test.deep.value" /> */}
                </React.Fragment>
            )}
        </Morfix>
    );
};

export default App;
