import React, { ComponentProps, ComponentType, createElement, ElementType } from 'react';
import invariant from 'tiny-invariant';

export type RenderHelpers<B, C extends ComponentType | ElementType> = (
    | {
          children: ((bag: B) => React.ReactNode) | React.ReactNode;
          as?: never;
      }
    | {
          children?: React.ReactNode;
          as: C;
      }
) &
    Omit<ComponentProps<C>, 'children' | 'as' | keyof B>;

type RenderComponentProps<B, C extends ComponentType | ElementType> = RenderHelpers<B, C> & {
    bag: B;
    elementProps?: unknown;
};

export const renderComponent = <B, C extends ComponentType | ElementType>({
    as,
    children,
    bag,
    elementProps,
    ...other
}: RenderComponentProps<B, C>): JSX.Element => {
    invariant(as || typeof children === 'function', 'Cannot render: not specified renderer("children" or "as" props)');

    if (typeof children === 'function') {
        return children(bag);
    }

    if (typeof as !== 'string' && as) {
        return createElement(as, { ...bag, ...other }, children);
    }

    if (as !== undefined) {
        return createElement(as, { ...bag, ...(elementProps as object), ...other }, children);
    }

    throw new Error('No renderer found');
};
