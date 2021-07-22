import React, { createElement } from 'react';
import invariant from 'tiny-invariant';

export type StrictRenderHelpers<B, C extends React.ComponentType | React.ElementType> = (
    | {
          children: ((bag: B) => React.ReactNode) | React.ReactNode;
          as?: never;
      }
    | {
          children?: React.ReactNode;
          as: C;
      }
) &
    Omit<React.ComponentProps<C>, 'children' | 'as' | keyof B>;

export type RenderHelpers<B, C extends React.ComponentType | React.ElementType> = (
    | {
          children: ((bag: B) => React.ReactNode) | React.ReactNode;
          as?: never;
      }
    | {
          children?: React.ReactNode;
          as?: C;
      }
) &
    Omit<React.ComponentProps<C>, 'children' | 'as' | keyof B>;

type RenderComponentProps<B, C extends React.ComponentType | React.ElementType> = StrictRenderHelpers<B, C> & {
    bag: B;
    elementProps?: unknown;
};

export const renderComponent = <B, C extends React.ComponentType | React.ElementType>({
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
