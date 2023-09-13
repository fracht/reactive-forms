import React from 'react';

import { FieldConfig, useField } from './useField';
import { FieldContext } from '../../typings/FieldContext';

export type FieldProps<V> = FieldConfig<V> & {
	children: (ctx: FieldContext<V>) => React.ReactNode;
};

export const Field = <V,>({ children, ...config }: FieldProps<V>) => {
	const bag = useField(config);

	return <React.Fragment>{children(bag)}</React.Fragment>;
};
