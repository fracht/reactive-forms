import React, { ComponentType, ElementType, useCallback } from 'react';
import { SubmitAction, useFormContext, useFormMeta } from '@reactive-forms/core';

import { renderComponent, RenderHelpers } from './renderComponent';

export type SubmitButtonBag = {
    onClick: (e: React.MouseEvent) => void;
    disabled?: boolean;
};

export type SubmitButtonProps<Values extends object, C extends ComponentType | ElementType = 'button'> = {
    submitAction?: SubmitAction<Values>;
} & RenderHelpers<SubmitButtonBag, C>;

export const SubmitButton = <Values extends object, C extends ComponentType | ElementType = 'button'>({
    submitAction,
    as,
    ...other
}: SubmitButtonProps<Values, C>) => {
    const { submit } = useFormContext<Values>();
    const isSubmitting = useFormMeta<boolean>('isSubmitting');

    const onClick = useCallback(() => {
        submit(submitAction);
    }, [submit, submitAction]);

    return renderComponent({
        as: as ?? 'button',
        bag: {
            onClick,
            disabled: isSubmitting
        },
        ...(other as RenderHelpers<SubmitButtonBag, C>)
    });
};
