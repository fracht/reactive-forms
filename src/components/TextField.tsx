import { ComponentType, createElement, ElementType, ReactNode } from 'react';
import invariant from 'tiny-invariant';

import { TextFieldConfig, TextFieldProps, useTextField } from '../hooks';

export type TextFieldComponentProps = TextFieldConfig & {
    component?: ElementType | ComponentType<TextFieldProps>;
    children?: ReactNode | ((shared: TextFieldProps) => ReactNode);
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
        ? createElement(component, fieldBag, children)
        : createElement(component ?? 'input', field, children);
};
