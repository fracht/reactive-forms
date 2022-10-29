import invariant from 'tiny-invariant';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class FunctionArray<T extends (...arguments_: any[]) => any> {
	private items: Array<T> = [];

	public call = (...arguments_: Parameters<T>): ReturnType<T>[] => {
		return this.items.map((function_) => function_(...arguments_));
	};

	public lazyCall = (...arguments_: Parameters<T>): ReturnType<T> | undefined => {
		for (const item of this.items) {
			const output = item(...arguments_);
			if (output !== null && output !== undefined && output !== void 0) {
				return output;
			}
		}
		return undefined;
	};

	public asyncCall = async (...arguments_: Parameters<T>): Promise<ReturnType<T>[]> => {
		return Promise.all(this.items.map(async (function_) => await function_(...arguments_)));
	};

	public lazyAsyncCall = async (...arguments_: Parameters<T>): Promise<ReturnType<T> | undefined> => {
		for (const item of this.items) {
			const output = await item(...arguments_);
			if (output !== null && output !== undefined && output !== void 0) {
				return output;
			}
		}
		return undefined;
	};

	public push = (function_: T) => {
		this.items.push(function_);
	};

	public remove = (function_: T) => {
		const index = this.items.indexOf(function_);

		invariant(index !== -1, 'Could not remove, because function does not exist in array.');

		this.items.splice(index, 1);
	};

	public isEmpty = () => this.items.length === 0;
}

export type Observer<T> = (message: T) => void;

export type ObserversArray<T> = FunctionArray<Observer<T>>;
