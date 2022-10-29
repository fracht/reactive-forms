import { SubmitAction, useFormContext, useFormMeta } from '@reactive-forms/core';
import { createPxth } from 'pxth';
import React, { ComponentType, ElementType, useCallback } from 'react';

import { renderComponent, RenderHelpers } from './renderComponent';

export type SubmitButtonBag = {
	onClick: (event: React.MouseEvent) => void;
	disabled: boolean;
};

export type SubmitButtonProps<Values extends object, C extends ComponentType | ElementType = 'button'> = {
	submitAction?: SubmitAction<Values>;
} & RenderHelpers<SubmitButtonBag, C>;

export const SubmitButton = <Values extends object, C extends ComponentType | ElementType = 'button'>({
	submitAction,
	as,
	...other
}: SubmitButtonProps<Values, C>) => {
	const { submit } = useFormContext<Values>();
	const isSubmitting = useFormMeta(createPxth<boolean>(['isSubmitting']));

	const onClick = useCallback(() => {
		submit(submitAction);
	}, [submit, submitAction]);

	return renderComponent({
		as: as ?? 'button',
		bag: {
			onClick,
			disabled: isSubmitting,
		},
		...(other as RenderHelpers<SubmitButtonBag, C>),
	});
};
