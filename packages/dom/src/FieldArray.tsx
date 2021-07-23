import { ComponentType, ElementType } from 'react';
import { ArrayFieldProps, useArrayField } from '@reactive-forms/core';

import { renderComponent, StrictRenderHelpers } from './renderComponent';

export type FieldArrayProps<V, C extends ComponentType | ElementType = ComponentType | ElementType> = {
    name: string;
} & StrictRenderHelpers<ArrayFieldProps<V>, C>;

export const FieldArray = <V, C extends ComponentType | ElementType = ComponentType | ElementType>({
    name,
    as,
    ...renderComponentProps
}: FieldArrayProps<V, C>) => {
    const arrayHelpers = useArrayField<V>({ name });

    return renderComponent({
        bag: arrayHelpers,
        as,
        ...(renderComponentProps as StrictRenderHelpers<ArrayFieldProps<V>, C>)
    });
};
