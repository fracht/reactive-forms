import { ComponentType, ElementType } from 'react';
import { ArrayFieldProps, useArrayField } from '@reactive-forms/core';
import { Pxth } from 'pxth';

import { renderComponent, StrictRenderHelpers } from './renderComponent';

export type FieldArrayProps<V, C extends ComponentType | ElementType = ComponentType | ElementType> = {
	name: Pxth<Array<V>>;
} & StrictRenderHelpers<ArrayFieldProps<V>, C>;

export const FieldArray = <V, C extends ComponentType | ElementType = ComponentType | ElementType>({
	name,
	...renderComponentProps
}: FieldArrayProps<V, C>) => {
	const bag = useArrayField<V>({ name });

	return renderComponent({
		bag,
		...(renderComponentProps as unknown as StrictRenderHelpers<ArrayFieldProps<V>, C>),
	});
};
