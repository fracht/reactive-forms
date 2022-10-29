import { useFieldValue } from '@reactive-forms/core';
import { Pxth } from 'pxth';
import React, { ComponentType, ElementType, Fragment, PropsWithChildren } from 'react';

import { renderComponent, RenderHelpers } from './renderComponent';

export type FieldValueBag<V> = {
	children: V;
};

export type FieldValueProps<V, C extends ComponentType | ElementType = 'div'> = {
	name: Pxth<V>;
} & RenderHelpers<FieldValueBag<V>, C, V>;

const DefaultFieldValueRenderer = ({ children }: PropsWithChildren<{}>) => <Fragment>{children}</Fragment>;

export const FieldValue = <V, C extends ComponentType | ElementType = 'div'>({
	name,
	children,
	...renderComponentProps
}: FieldValueProps<V, C>) => {
	const [value] = useFieldValue<V>(name);

	return renderComponent({
		bag: {
			children: value,
		},
		childrenBag: value,
		as: DefaultFieldValueRenderer,
		children: children ?? value,
		...(renderComponentProps as RenderHelpers<FieldValueBag<V>, C, V>),
	});
};
