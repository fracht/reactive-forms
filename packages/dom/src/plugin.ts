import { FormShared, Plugin } from '@reactive-forms/core';
import { createPxth, parseSegmentsFromString } from 'pxth';
import { ChangeEvent, FocusEvent, useCallback } from 'react';

export const domPlugin: Plugin = {
	token: Symbol.for('dom'),
	useConfigDecorator: (config) => config,
	useBagDecorator: <T extends object>(shared: FormShared<T>) => {
		const { setFieldValue, setFieldTouched } = shared;

		const handleChange = useCallback(
			(event: ChangeEvent<HTMLInputElement>) => {
				setFieldValue(createPxth(parseSegmentsFromString(event.target.name)), event.target.value);
			},
			[setFieldValue],
		);

		const handleBlur = useCallback(
			(event: FocusEvent<HTMLInputElement>) => {
				setFieldTouched(createPxth(parseSegmentsFromString(event.target.name)), {
					$touched: true,
				});
			},
			[setFieldTouched],
		);

		return {
			...shared,
			handleChange,
			handleBlur,
		};
	},
};
