import React from 'react';
import { Morfix, TextField } from '@morfix/core';

export const App = () => {
    return (
        <Morfix
            initialValues={{
                array: new Array(100).fill('asdf')
            }}
        >
            {new Array(100).fill(0).map((_, index) => (
                <TextField key={index} name={`array.${index}`} />
            ))}
        </Morfix>
    );
};
