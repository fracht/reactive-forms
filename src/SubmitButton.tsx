import React from 'react';

import { MorfixValues, SubmitAction } from './types';
import { useFormSubmit } from './useFormSubmit';

export type SubmitButtonProps<Values extends MorfixValues> = {
    onClick?: SubmitAction<Values>;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'>;

export const SubmitButton = <Values extends MorfixValues>({
    onClick: submitAction,
    ...other
}: SubmitButtonProps<Values>) => {
    const onClick = useFormSubmit(submitAction);

    return <button {...other} onClick={onClick} />;
};
