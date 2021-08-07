import React from 'react';
import { FieldValueArrayConfig, useFieldValueArray } from '@reactive-forms/core';

export type FieldValueArrayProps<T extends object> = FieldValueArrayConfig<Omit<T, 'children'>> & {
    children: (values: Omit<T, 'children'>) => React.ReactNode;
};

export const FieldValueArray = <T extends object>({ children, ...paths }: FieldValueArrayProps<T>) => {
    const bag = useFieldValueArray<T>(paths as unknown as FieldValueArrayConfig<T>);

    return <React.Fragment>{children(bag)}</React.Fragment>;
};
