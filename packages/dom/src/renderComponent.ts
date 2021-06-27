import React, { Attributes, ComponentProps, ComponentType, createElement, ElementType, ReactNode } from 'react';
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

// <Field />

// <Field />

export const renderComponent = <B, C extends ComponentType | ElementType>({
    as,
    children,
    bag,
    elementProps,
    ...other,
}: RenderComponentProps<B, C>): JSX.Element => {
    invariant(
        as || typeof children === 'function',
        'Cannot render: not specified renderer("children" or "component" props)'
    );

    if (typeof children === 'function') {
        return children(bag);
    }

    if(typeof as !== 'string' && as) {
        return createElement(as, { ...bag, ...other }, children);
    }

    if(typeof )

    // if (typeof copmonent !== 'string')
    //     return typeof children === 'function'
    //         ? children(bag)
    //         : typeof component !== 'string' && component
    //         ? createElement(component, bag, children)
    //         : defaultComponent
    //         ? createElement(component ?? defaultComponent, elementComponentProps ?? bag, children)
    //         : component
    //         ? createElement(component, (elementComponentProps ?? bag) as unknown as Attributes, children)
    //         : invariant(false, 'Cannot render: not specified renderer("children" or "component" props)');
};
