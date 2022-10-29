import { useFieldError, useFieldTouched } from '@reactive-forms/core';
import { Pxth } from 'pxth';
import { ComponentType, ElementType } from 'react';

import { renderComponent, RenderHelpers } from './renderComponent';

type ErrorMessageBag = {
	children: string;
};

type ErrorMessageType<C extends ComponentType | ElementType = 'span'> = {
	name: Pxth<unknown>;
} & RenderHelpers<ErrorMessageBag, C>;

export const ErrorMessage = <C extends ComponentType | ElementType = 'span'>({
	name,
	as,
	children,
	...renderComponentProps
}: ErrorMessageType<C>) => {
	const [touched] = useFieldTouched(name);
	const [error] = useFieldError(name);

	const message = touched?.$touched && error?.$error ? error.$error : undefined;

	return message !== undefined
		? renderComponent<ErrorMessageBag, C>({
				bag: {
					children: message,
				},
				as: as ?? 'span',
				children: children ?? message,
				...(renderComponentProps as RenderHelpers<ErrorMessageBag, C>),
		  })
		: null;
};
