import { Pxth } from 'pxth';
import React, { createContext } from 'react';
import { StockProxy } from 'stocked';

import { useProxyInterception } from '../hooks/useProxyInterception';
import { FormContext } from './FormContext';

export type FormProxyProviderProps<V> = {
	proxy: StockProxy<V>;
	children: React.ReactNode | ((path: Pxth<V>) => React.ReactNode);
};

export const FormProxyContext = createContext<StockProxy<unknown> | undefined>(undefined);

export const FormProxyProvider = <V,>({ proxy, children }: FormProxyProviderProps<V>) => {
	const newContext = useProxyInterception(proxy);

	return (
		<FormContext.Provider value={newContext}>
			<FormProxyContext.Provider value={proxy as StockProxy<unknown>}>
				{typeof children === 'function' ? children(proxy.path) : children}
			</FormProxyContext.Provider>
		</FormContext.Provider>
	);
};
