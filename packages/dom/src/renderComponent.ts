import { ComponentProps, ComponentType, createElement, ElementType, ReactNode } from 'react';
import invariant from 'tiny-invariant';

export type StrictRenderHelpers<B, C extends ComponentType | ElementType, ChildrenBag = B> = (
    | {
          children: ((bag: ChildrenBag) => ReactNode) | ReactNode;
          as?: never;
      }
    | {
          children?: ReactNode;
          as: C;
      }
) &
    Omit<ComponentProps<C>, 'children' | 'as' | keyof B>;

export type RenderHelpers<B, C extends ComponentType | ElementType, ChildrenBag = B> = (
    | {
          children: ((bag: ChildrenBag) => ReactNode) | ReactNode;
          as?: never;
      }
    | {
          children?: ReactNode;
          as?: C;
      }
) &
    Omit<ComponentProps<C>, 'children' | 'as' | keyof B>;

type RenderComponentProps<B, C extends ComponentType | ElementType, ChildrenBag = B> = StrictRenderHelpers<
    B,
    C,
    ChildrenBag
> & {
    bag: B;
    elementProps?: unknown;
    childrenBag?: ChildrenBag;
};

export const renderComponent = <B, C extends ComponentType | ElementType, ChildrenBag = B>({
    as,
    children,
    bag,
    elementProps,
    childrenBag,
    ...other
}: RenderComponentProps<B, C, ChildrenBag>): JSX.Element => {
    if (typeof children === 'function') {
        return children(childrenBag ?? (bag as unknown as ChildrenBag));
    }

    if (typeof as !== 'string' && as) {
        return createElement(as, { ...bag, ...other }, children);
    }

    if (as !== undefined) {
        return createElement(as, { ...((elementProps ?? bag) as object), ...other }, children);
    }

    invariant(false, 'Cannot render: not specified renderer("children" or "as" props)');
};
