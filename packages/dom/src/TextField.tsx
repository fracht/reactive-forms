import { ComponentType, ElementType } from 'react';

import { renderComponent, RenderHelpers } from './renderComponent';
import { TextFieldBag, TextFieldConfig, useTextField } from './useTextField';

export type TextFieldProps<C extends ComponentType | ElementType> = TextFieldConfig & RenderHelpers<TextFieldBag, C>;

export const TextField = <C extends ComponentType | ElementType = 'input'>({
	name,
	as,
	...renderComponentProps
}: TextFieldProps<C>) => {
	const bag = useTextField({ name });

	return renderComponent<TextFieldBag, C>({
		bag,
		as: as ?? 'input',
		...(renderComponentProps as RenderHelpers<TextFieldBag, C>),
	});
};
