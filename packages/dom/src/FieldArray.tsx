import { ComponentType, ElementType } from 'react';
import { ArrayFieldProps, useArrayField } from '@reactive-forms/core';

import { renderComponent, RenderHelpers } from './renderComponent';

type FieldArrayProps<V, C extends ComponentType | ElementType = 'input'> = {
    name: string;
} & RenderHelpers<ArrayFieldProps<V>, C>;

export const FieldArray = <V, C extends ComponentType | ElementType = 'fieldset'>({
    name,
    as,
    ...renderComponentProps
}: FieldArrayProps<V, C>) => {
    const arrayHelpers = useArrayField<V>({ name });

    return renderComponent({
        bag: arrayHelpers,
        as: as ?? 'fieldset',
        ...(renderComponentProps as RenderHelpers<ArrayFieldProps<V>, C>)
    });
};
