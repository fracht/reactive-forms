import React, { Fragment } from 'react';

import Morfix, {
    ArrayFieldProps,
    ObjectField,
    ObjectFieldConfig,
    RealtimeField,
    ArrayField,
    SubmitButton
} from 'morfix';
import { array, object } from 'yup';

const TestField = (config: ObjectFieldConfig<{ hello: string; bye: string }>) => (
    <ObjectField {...config}>
        {() => (
            <div>
                <RealtimeField
                    validate={(value) => (value.length > 0 ? undefined : { message: 'required' })}
                    name={`${config.name}.hello`}
                />
                <RealtimeField name={`${config.name}.bye`} />
            </div>
        )}
    </ObjectField>
);

interface Data {
    hello: string;
    bye: string;
}

const App = () => {
    return (
        <Morfix
            onSubmit={(val) => alert(JSON.stringify(val, undefined, 4))}
            initialValues={{
                testField: [
                    {
                        hello: 'a',
                        bye: 'b'
                    },
                    {
                        hello: 'c',
                        bye: 'asdfasdf'
                    },
                    {
                        hello: 'h',
                        bye: 'f'
                    }
                ]
            }}
            validationSchema={
                object().shape({
                    testField: array().min(5)
                }) as any
            }
        >
            {() => (
                <React.Fragment>
                    <h2>Hello world</h2>
                    <p>this is Morfix example</p>
                    <ArrayField name="testField">
                        {({ items, push, remove, pop }: ArrayFieldProps<Data>) => (
                            <div>
                                {items.map((item, index) => (
                                    <Fragment key={index}>
                                        Hello, {item.hello}:
                                        <TestField name={`testField[${index}]`} />
                                        <button onClick={() => remove(index)}>Remove {item.bye}</button>
                                    </Fragment>
                                ))}
                                <div>
                                    <button onClick={() => push({ hello: '', bye: '' })}>Add</button>
                                    <button onClick={pop}>Remove last</button>
                                </div>
                                <SubmitButton>Submit</SubmitButton>
                            </div>
                        )}
                    </ArrayField>
                </React.Fragment>
            )}
        </Morfix>
    );
};

export default App;
