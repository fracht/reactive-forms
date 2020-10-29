import React, { ComponentType, ElementType } from 'react';
import invariant from 'tiny-invariant';

import { TextFieldConfig, TextFieldProps, useTextField } from '../hooks';

export type TextFieldComponentProps = TextFieldConfig & {
    component?: ElementType | ComponentType<TextFieldProps>;
    children?: React.ReactNode | ((shared: TextFieldProps) => React.ReactNode);
};

export const TextField = ({
    name,
    onChange,
    onBlur,
    validator,
    schema,
    component,
    children
}: TextFieldComponentProps) => {
    const fieldBag = useTextField({ name, onChange, onBlur, validator, schema });

    const { field } = fieldBag;

    invariant(
        !(typeof children === 'function' && component),
        'Cannot use "component" and "children" renderers at once'
    );

    return typeof children === 'function'
        ? children(fieldBag)
        : typeof component !== 'string' && component
        ? React.createElement(component, fieldBag, children)
        : React.createElement(component ?? 'input', field, children);
};
