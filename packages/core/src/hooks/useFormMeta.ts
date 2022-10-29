import { Pxth } from 'pxth';
import { useStockValue } from 'stocked';

import { FormMeta } from '../typings/FormMeta';
import { useFormContext } from './useFormContext';

export const useFormMeta = <V>(name: Pxth<V>): V => {
	const { formMeta } = useFormContext();

	return useStockValue<V, FormMeta>(name, formMeta);
};
