import React from 'react';
import invariant from 'tiny-invariant';

import { useFieldValue } from '../hooks/useFieldValue';

export type DisplayValueProps<V> = {
    name: string;
    children?: (value: V) => React.ReactNode;
    renderValue?: (value: V) => React.ReactNode;
};

export const DisplayValue = <V,>({ name, children, renderValue }: DisplayValueProps<V>) => {
    const [value] = useFieldValue<V>(name);

    invariant(
        typeof renderValue === 'function' ||
            typeof children === 'function' ||
            typeof value !== 'object' ||
            value === null,
        `Cannot render value at path "${name}": value is object. Specify renderer via "children" prop.`
    );

    invariant(
        !(typeof renderValue === 'function' && typeof children === 'function'),
        `Cannot render value at path "${name}": "renderValue" is alias for "children", so use only one function at the same time`
    );

    const valueRenderer = children ?? renderValue;

    return <React.Fragment>{valueRenderer ? valueRenderer(value) : value}</React.Fragment>;
};
