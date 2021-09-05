import { ComponentType, ElementType } from 'react';

import { renderComponent, RenderHelpers } from './renderComponent';
import { FieldBag, FieldConfig, useField } from './useField';

export type FieldProps<V, C extends ComponentType | ElementType> = FieldConfig & RenderHelpers<FieldBag<V>, C>;

export const Field = <V, C extends ComponentType | ElementType = 'input'>({
    name,
    as,
    ...renderComponentProps
}: FieldProps<V, C>) => {
    const bag = useField<V>({ name });

    return renderComponent<FieldBag<V>, C>({
        bag,
        as: as ?? 'input',
        ...(renderComponentProps as RenderHelpers<FieldBag<V>, C>)
    });
};
