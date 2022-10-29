const notLoadedError = (name: string) =>
	`${name} is not loaded yet. You probably forgot to use fallback, or check using "isLoaded" property.`;

const notLoadedFn = (name: string) => () => {
	throw new Error(notLoadedError(name));
};

const getErrorHandler = (name: string): ProxyHandler<object> => {
	const fn = notLoadedFn(name);

	return {
		get: fn,
		set: fn,
		deleteProperty: fn,
		has: fn,
		defineProperty: fn,
		ownKeys: fn,
	};
};

const defaultNotLoadedFn = notLoadedFn('Object');

const guardHandler: ProxyHandler<object> = {
	get: (target: object, path: string | symbol) => {
		const value = target[path];

		if (typeof value === 'function') {
			return notLoadedFn(path.toString());
		} else if (typeof value === 'object' && value !== null) {
			return new Proxy(value, getErrorHandler(path.toString()));
		}

		return value;
	},
	set: defaultNotLoadedFn,
	deleteProperty: defaultNotLoadedFn,
	has: defaultNotLoadedFn,
	defineProperty: defaultNotLoadedFn,
	ownKeys: defaultNotLoadedFn,
};

export const loadingGuard = <T extends object>(value: T, isLoaded: boolean): T => {
	return isLoaded ? value : (new Proxy(value, guardHandler) as T);
};
