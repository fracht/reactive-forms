import { useFormContext } from '@reactive-forms/core';
import { Pxth } from 'pxth';
import { useStockValue } from 'stocked';

import { LightFieldInputBag, useLightField } from './useLightField';

export type TextFieldConfig = {
	name: Pxth<string>;
};

export type TextFieldBag = LightFieldInputBag & {
	value: string;
};

export const useTextField = ({ name }: TextFieldConfig): TextFieldBag => {
	const [inputBag] = useLightField({ name });
	const { values } = useFormContext();

	const value = useStockValue<string>(name, values);

	// TODO: add field meta here
	return {
		...inputBag,
		value,
	};
};
