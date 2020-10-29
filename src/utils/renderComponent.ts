import { ComponentType, createElement, ElementType, ReactNode } from 'react';
import invariant from 'tiny-invariant';

export type RenderHelpers<T> = {
    component?: ElementType | ComponentType<T>;
    children?: ReactNode | ((bag: T) => ReactNode);
};

export const renderComponent = <T>({
    component,
    children,
    defaultComponent,
    bag,
    elementComponentProps
}: RenderHelpers<T> & {
    defaultComponent?: ElementType | ComponentType<T>;
    bag: T;
    elementComponentProps?: unknown;
}): JSX.Element => {
    invariant(
        !(typeof children === 'function' && component),
        'Cannot use "children" and "component" renderers at once'
    );

    invariant(
        defaultComponent || component || typeof children === 'function',
        'Cannot render: not specified renderer("children" or "component" props)'
    );

    return typeof children === 'function'
        ? children(bag)
        : typeof component !== 'string' && component
        ? createElement(component, bag, children)
        : defaultComponent
        ? createElement(component ?? defaultComponent, elementComponentProps ?? bag, children)
        : null;
};
