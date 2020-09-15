import React, { Fragment } from 'react';

import Morfix, {
    ArrayField,
    ArrayFieldProps,
    ObjectField,
    ObjectFieldConfig,
    RealtimeField
} from 'morfix';

const TestField = (config: ObjectFieldConfig) => (
    <ObjectField {...config}>
        {() => (
            <div>
                <RealtimeField name={`${config.name}.hello`} />
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
        >
            {() => (
                <React.Fragment>
                    <h2>Hello world</h2>
                    <p>this is Morfix example</p>
                    <ArrayField name="testField">
                        {({
                            items,
                            push,
                            remove,
                            pop
                        }: ArrayFieldProps<Data>) => (
                            <div>
                                {items.map((item, index) => (
                                    <Fragment key={index}>
                                        Hello, {item.hello}:
                                        <TestField
                                            name={`testField[${index}]`}
                                        />
                                        <button onClick={() => remove(index)}>
                                            Remove {item.bye}
                                        </button>
                                    </Fragment>
                                ))}
                                <div>
                                    <button
                                        onClick={() =>
                                            push({ hello: '', bye: '' })
                                        }
                                    >
                                        Add
                                    </button>
                                    <button onClick={pop}>Remove last</button>
                                </div>
                            </div>
                        )}
                    </ArrayField>
                </React.Fragment>
            )}
        </Morfix>
    );
};

export default App;
