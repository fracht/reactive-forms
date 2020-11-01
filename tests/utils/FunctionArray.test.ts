import { FunctionArray } from '../../src/utils/FunctionArray';

describe('Function array push and remove', () => {
    it('should add', () => {
        const arr = new FunctionArray<() => void>();
        const fn = jest.fn();
        arr.push(fn);
        arr.call();
        expect(fn).toBeCalled();
    });

    it('should remove', () => {
        const arr = new FunctionArray<() => void>();
        const fn = jest.fn();
        arr.push(fn);
        arr.call();
        arr.remove(fn);
        arr.call();
        expect(fn).toBeCalledTimes(1);
    });

    it('should be empty', () => {
        const arr = new FunctionArray<() => void>();
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        arr.push(fn1);
        arr.push(fn2);
        arr.call();
        arr.remove(fn1);
        arr.call();
        arr.remove(fn2);
        arr.call();
        expect(fn1).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(2);
        expect(arr.isEmpty()).toBeTruthy();
    });
});

describe('FunctionArray call and lazy call', () => {
    it('should call all', () => {
        const arr = new FunctionArray();

        const fn = jest.fn();
        fn.mockReturnValue(10);
        arr.push(fn);
        arr.push(fn);
        arr.push(fn);
        const out = arr.call();
        expect(out).toStrictEqual([10, 10, 10]);
        expect(fn).toBeCalledTimes(3);
    });

    it('should call only first', () => {
        const arr = new FunctionArray();

        const fn = jest.fn();
        arr.push(fn);
        arr.push(fn);
        arr.push(fn);

        fn.mockReturnValueOnce(15);

        const lazyValue = arr.lazyCall();

        expect(lazyValue).toBe(15);
        expect(fn).toBeCalledTimes(1);
    });

    it('should call until get value', () => {
        const arr = new FunctionArray();

        const fn = jest.fn();
        arr.push(fn);
        arr.push(fn);
        arr.push(fn);

        fn.mockReturnValueOnce(undefined);
        fn.mockReturnValueOnce(10);

        const lazyValue = arr.lazyCall();

        expect(lazyValue).toBe(10);
        expect(fn).toBeCalledTimes(2);
    });

    it('should return undefined', () => {
        const arr = new FunctionArray();

        const output = arr.lazyCall();

        expect(output).toBe(undefined);
    });
});

describe('FunctionArray async call and lazy async call', () => {
    it('should call all', async () => {
        const arr = new FunctionArray();

        const fn = jest.fn(() => Promise.resolve(5));
        arr.push(fn);
        arr.push(fn);
        arr.push(fn);
        const output = await arr.asyncCall();
        expect(output).toStrictEqual([5, 5, 5]);
        expect(fn).toBeCalledTimes(3);
    });

    it('should call only first', async () => {
        const arr = new FunctionArray();

        const fn = jest.fn();
        arr.push(fn);
        arr.push(fn);
        arr.push(fn);

        fn.mockImplementation(() => Promise.resolve(15));

        const lazyValue = await arr.lazyAsyncCall();

        expect(lazyValue).toBe(15);
        expect(fn).toBeCalledTimes(1);
    });

    it('should call until get value', async () => {
        const arr = new FunctionArray();

        const fn = jest.fn();
        arr.push(fn);
        arr.push(fn);
        arr.push(fn);

        fn.mockImplementationOnce(() => Promise.resolve(undefined));
        fn.mockImplementationOnce(() => Promise.resolve(10));

        const lazyValue = await arr.lazyAsyncCall();

        expect(lazyValue).toBe(10);
        expect(fn).toBeCalledTimes(2);
    });

    it('should return undefined', async () => {
        const arr = new FunctionArray();

        const output = await arr.lazyAsyncCall();

        expect(output).toBe(undefined);
    });
});
