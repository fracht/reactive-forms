import invariant from 'tiny-invariant';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class FunctionArray<T extends (...arguments_: any[]) => any> {
	private items: Array<T> = [];

	public call = (...args: Parameters<T>): ReturnType<T>[] => {
		return this.items.map((fn) => fn(...args));
	};

	public lazyCall = (...args: Parameters<T>): ReturnType<T> | undefined => {
		for (const item of this.items) {
			const output = item(...args);
			if (output !== null && output !== undefined && output !== void 0) {
				return output;
			}
		}
		return undefined;
	};

	public asyncCall = async (...args: Parameters<T>): Promise<ReturnType<T>[]> => {
		return Promise.all(this.items.map(async (fn) => await fn(...args)));
	};

	public lazyAsyncCall = async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
		for (const item of this.items) {
			const output = await item(...args);
			if (output !== null && output !== undefined && output !== void 0) {
				return output;
			}
		}
		return undefined;
	};

	public push = (...fns: T[]) => {
		this.items.push(...fns);
	};

	public remove = (fn: T) => {
		const index = this.items.indexOf(fn);

		invariant(index !== -1, 'Could not remove, because function does not exist in array.');

		this.items.splice(index, 1);
	};

	public isEmpty = () => this.items.length === 0;
}

export type Observer<T> = (message: T) => void;

export type ObserversArray<T> = FunctionArray<Observer<T>>;
