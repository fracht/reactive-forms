import { ComponentType, ElementType } from 'react';
import { useFieldValue } from '@reactive-forms/core';

import { renderComponent, RenderHelpers } from './renderComponent';

export type FieldValueBag<V> = {
    value: V;
};

export type FieldValueProps<V, C extends ComponentType | ElementType = 'div'> = {
    name: string;
} & RenderHelpers<FieldValueBag<V>, C>;

export const FieldValue = <V, C extends ComponentType | ElementType = 'div'>({
    name,
    as,
    children,
    ...renderComponentProps
}: FieldValueProps<V, C>) => {
    const [value] = useFieldValue<V>(name);

    return renderComponent({
        bag: { value },
        as: as ?? 'div',
        children: children ?? value,
        ...(renderComponentProps as RenderHelpers<FieldValueBag<V>, C>)
    });
};
