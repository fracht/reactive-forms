import React, { ButtonHTMLAttributes, ComponentType, createElement, ReactNode } from 'react';
import invariant from 'tiny-invariant';

import { useSubmitAction } from '../hooks';
import { SubmitAction } from '../typings';

export type SubmitButtonProps<T extends object> = {
    submitAction?: SubmitAction<T>;
    component?: ComponentType<{ onClick: () => void }>;
    children?: ReactNode | ((onClick: () => void) => ReactNode);
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const SubmitButton = <T extends object>({
    submitAction,
    component,
    children,
    ...other
}: SubmitButtonProps<T>) => {
    invariant(!(typeof children === 'function' && component), 'Cannot use "component" and "children" render props.');

    const onClick = useSubmitAction<T>(submitAction);

    return typeof children === 'function' ? (
        children(onClick)
    ) : component ? (
        createElement(component, { onClick }, children)
    ) : (
        <button onClick={onClick} {...other}>
            {children}
        </button>
    );
};
