import { FunctionArray } from '../../src/utils/FunctionArray';

describe('Function array push and remove', () => {
	it('should add', () => {
		const array = new FunctionArray<() => void>();
		const function_ = jest.fn();
		array.push(function_);
		array.call();
		expect(function_).toBeCalled();
	});

	it('should remove', () => {
		const array = new FunctionArray<() => void>();
		const function_ = jest.fn();
		array.push(function_);
		array.call();
		array.remove(function_);
		array.call();
		expect(function_).toBeCalledTimes(1);
	});

	it('should be empty', () => {
		const array = new FunctionArray<() => void>();
		const function1 = jest.fn();
		const function2 = jest.fn();
		array.push(function1, function2);
		array.call();
		array.remove(function1);
		array.call();
		array.remove(function2);
		array.call();
		expect(function1).toBeCalledTimes(1);
		expect(function2).toBeCalledTimes(2);
		expect(array.isEmpty()).toBeTruthy();
	});
});

describe('FunctionArray call and lazy call', () => {
	it('should call all', () => {
		const array = new FunctionArray();

		const function_ = jest.fn();
		function_.mockReturnValue(10);
		array.push(function_, function_, function_);
		const out = array.call();
		expect(out).toStrictEqual([10, 10, 10]);
		expect(function_).toBeCalledTimes(3);
	});

	it('should call only first', () => {
		const array = new FunctionArray();

		const function_ = jest.fn();
		array.push(function_, function_, function_);

		function_.mockReturnValueOnce(15);

		const lazyValue = array.lazyCall();

		expect(lazyValue).toBe(15);
		expect(function_).toBeCalledTimes(1);
	});

	it('should call until get value', () => {
		const array = new FunctionArray();

		const function_ = jest.fn();
		array.push(function_, function_, function_);

		function_.mockReturnValueOnce();
		function_.mockReturnValueOnce(10);

		const lazyValue = array.lazyCall();

		expect(lazyValue).toBe(10);
		expect(function_).toBeCalledTimes(2);
	});

	it('should return undefined', () => {
		const array = new FunctionArray();

		const output = array.lazyCall();

		expect(output).toBe(undefined);
	});
});

describe('FunctionArray async call and lazy async call', () => {
	it('should call all', async () => {
		const array = new FunctionArray();

		const function_ = jest.fn(() => Promise.resolve(5));
		array.push(function_, function_, function_);
		const output = await array.asyncCall();
		expect(output).toStrictEqual([5, 5, 5]);
		expect(function_).toBeCalledTimes(3);
	});

	it('should call only first', async () => {
		const array = new FunctionArray();

		const function_ = jest.fn();
		array.push(function_, function_, function_);

		function_.mockImplementation(() => Promise.resolve(15));

		const lazyValue = await array.lazyAsyncCall();

		expect(lazyValue).toBe(15);
		expect(function_).toBeCalledTimes(1);
	});

	it('should call until get value', async () => {
		const array = new FunctionArray();

		const function_ = jest.fn();
		array.push(function_, function_, function_);

		function_.mockImplementationOnce(() => Promise.resolve());
		function_.mockImplementationOnce(() => Promise.resolve(10));

		const lazyValue = await array.lazyAsyncCall();

		expect(lazyValue).toBe(10);
		expect(function_).toBeCalledTimes(2);
	});

	it('should return undefined', async () => {
		const array = new FunctionArray();

		const output = await array.lazyAsyncCall();

		expect(output).toBe(undefined);
	});
});
