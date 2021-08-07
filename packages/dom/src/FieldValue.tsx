import { ComponentType, ElementType } from 'react';
import { useFieldValue } from '@reactive-forms/core';

import { renderComponent, RenderHelpers } from './renderComponent';

export type FieldValueProps<V, C extends ComponentType | ElementType = 'div'> = {
    name: string;
} & Omit<RenderHelpers<V, C>, 'as'>;

export const FieldValue = <V, C extends ComponentType | ElementType = 'div'>({
    name,
    children,
    ...renderComponentProps
}: FieldValueProps<V, C>) => {
    const [value] = useFieldValue<V>(name);

    return renderComponent({
        bag: value,
        as: 'div',
        children: children ?? value,
        ...(renderComponentProps as RenderHelpers<V, C>)
    });
};
