import React from 'react';
import { Form, TextField } from '@reactive-forms/core';

export const App = () => {
    return (
        <Form
            initialValues={{
                array: new Array(100).fill('asdf')
            }}
        >
            {new Array(100).fill(0).map((_, index) => (
                <TextField key={index} name={`array.${index}`} />
            ))}
        </Form>
    );
};
