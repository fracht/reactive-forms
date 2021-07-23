import { ComponentType, ElementType } from 'react';
import { useField } from '@reactive-forms/core';

import { renderComponent, RenderHelpers } from './renderComponent';

type ErrorMessageBag = {
    message?: string;
};

type ErrorMessageType<C extends ComponentType | ElementType = 'span'> = {
    name: string;
} & RenderHelpers<ErrorMessageBag, C>;

export const ErrorMessage = <C extends ComponentType | ElementType = 'span'>({
    name,
    as,
    ...renderComponentProps
}: ErrorMessageType<C>) => {
    const {
        meta: { touched, error }
    } = useField({ name });

    return renderComponent<ErrorMessageBag, C>({
        bag: {
            message: touched && error?.$error ? error.$error : undefined
        },
        as: as ?? 'span',
        ...(renderComponentProps as RenderHelpers<ErrorMessageBag, C>)
    });
};
