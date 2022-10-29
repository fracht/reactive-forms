const notLoadedError = (name: string) =>
	`${name} is not loaded yet. You probably forgot to use fallback, or check using "isLoaded" property.`;

const notLoadedFunction = (name: string) => () => {
	throw new Error(notLoadedError(name));
};

const getErrorHandler = (name: string): ProxyHandler<object> => {
	const fn = notLoadedFunction(name);

	return {
		get: fn,
		set: fn,
		deleteProperty: fn,
		has: fn,
		defineProperty: fn,
		ownKeys: fn,
	};
};

const defaultNotLoadedFunction = notLoadedFunction('Object');

const guardHandler: ProxyHandler<object> = {
	get: (target: object, path: string | symbol) => {
		const value = target[path];

		if (typeof value === 'function') {
			return notLoadedFunction(path.toString());
		} else if (typeof value === 'object' && value !== null) {
			return new Proxy(value, getErrorHandler(path.toString()));
		}

		return value;
	},
	set: defaultNotLoadedFunction,
	deleteProperty: defaultNotLoadedFunction,
	has: defaultNotLoadedFunction,
	defineProperty: defaultNotLoadedFunction,
	ownKeys: defaultNotLoadedFunction,
};

export const loadingGuard = <T extends object>(value: T, isLoaded: boolean): T => {
	return isLoaded ? value : (new Proxy(value, guardHandler) as T);
};
