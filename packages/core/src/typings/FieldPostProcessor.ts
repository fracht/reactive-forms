import { Pxth } from 'pxth';

export type FieldPostProcessor<V> = {
	path: Pxth<V>;
	update: (value: V) => V;
};
