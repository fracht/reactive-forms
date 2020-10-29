import { ButtonHTMLAttributes } from 'react';

import { useSubmitAction } from '../hooks';
import { SubmitAction } from '../typings';
import { renderComponent, RenderHelpers } from '../utils/renderComponent';

export type SubmitButtonProps<T extends object> = {
    submitAction?: SubmitAction<T>;
} & RenderHelpers<{ onClick: () => void }> &
    ButtonHTMLAttributes<HTMLButtonElement>;

export const SubmitButton = <T extends object>({
    submitAction,
    component,
    children,
    ...other
}: SubmitButtonProps<T>) => {
    const onClick = useSubmitAction<T>(submitAction);

    return renderComponent({
        component,
        children,
        defaultComponent: 'button',
        bag: { onClick },
        elementComponentProps: { ...other, onClick }
    });
};
