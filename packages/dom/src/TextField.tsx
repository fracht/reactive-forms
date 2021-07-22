import React from 'react';

import { renderComponent, RenderHelpers } from './renderComponent';
import { TextFieldBag, TextFieldConfig, useTextField } from './useTextField';

export type TextFieldProps<C extends React.ComponentType | React.ElementType> = TextFieldConfig &
    RenderHelpers<TextFieldBag, C>;

export const TextField = <C extends React.ComponentType | React.ElementType = 'input'>({
    name,
    as,
    ...renderComponentProps
}: TextFieldProps<C>) => {
    const bag = useTextField({ name });

    return renderComponent<TextFieldBag, C>({
        bag,
        as: as ?? 'input',
        ...(renderComponentProps as RenderHelpers<TextFieldBag, C>)
    });
};
