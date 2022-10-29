import { Pxth } from 'pxth';
import { Dispatch, SetStateAction, useStockState } from 'stocked';

import { FieldInnerTouched, FieldTouched } from '../typings/FieldTouched';
import { NestedObject } from '../typings/NestedObject';
import { useFormContext } from './useFormContext';

export const useFieldTouched = <V>(
	name: Pxth<V>,
): [FieldTouched<V> | undefined, Dispatch<SetStateAction<FieldTouched<V> | undefined>>] => {
	const { touched } = useFormContext<object>();

	return useStockState(name, touched) as unknown as [
		NestedObject<FieldInnerTouched, V> | undefined,
		Dispatch<SetStateAction<NestedObject<FieldInnerTouched, V> | undefined>>,
	];
};
