import { FormShared, Plugin } from '@reactive-forms/core';
import { createPxth, parseSegmentsFromString } from 'pxth';
import { ChangeEvent, FocusEvent, useCallback } from 'react';

export const domPlugin: Plugin = {
	token: Symbol.for('dom'),
	useConfigDecorator: (config) => config,
	useBagDecorator: <T extends object>(shared: FormShared<T>) => {
		const { setFieldValue, setFieldTouched } = shared;

		const handleChange = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				setFieldValue(createPxth(parseSegmentsFromString(e.target.name)), e.target.value);
			},
			[setFieldValue],
		);

		const handleBlur = useCallback(
			(e: FocusEvent<HTMLInputElement>) => {
				setFieldTouched(createPxth(parseSegmentsFromString(e.target.name)), {
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
