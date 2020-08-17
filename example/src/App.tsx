import React from 'react';

import Morfix, { Field } from 'morfix';

const App = () => {
    return (
        <Morfix
            initialValues={{
                hello: 'It works!',
                test: {
                    deep: {
                        value: '1aasdf'
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
                    <Field name="hello" />
                    <Field name="test.deep.value">
                        {(field) => (
                            <select {...field}>
                                <option>1</option>
                                <option>2</option>
                                <option>1aasdf</option>
                            </select>
                        )}
                    </Field>
                    {/* <StringField name="hello" />
                    <StringField name="test.deep.value" /> */}
                </React.Fragment>
            )}
        </Morfix>
    );
};

export default App;
