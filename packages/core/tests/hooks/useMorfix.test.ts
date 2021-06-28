import { act, renderHook } from '@testing-library/react-hooks';

import { MorfixHelpers, useMorfix } from '../../src';

describe('Test useMorfix functionality', () => {
    it('Should pass morfixHelpers into onSubmit', async () => {
        const initialValues = {
            test: 'asdf'
        };

        const onSubmit = jest.fn(async (initialValues, morfixHelpers: MorfixHelpers<{ test: string }>) => {
            expect(initialValues).toStrictEqual(initialValues);
            expect(morfixHelpers).toBeDefined();
            expect(await morfixHelpers.validateField('test', '')).toStrictEqual({ mrfxError: 'Required' });
            expect(await morfixHelpers.validateField('test', 'hello')).toBeUndefined();
            expect(await morfixHelpers.validateForm({ test: '' })).toStrictEqual({ test: { mrfxError: 'Required' } });
        });

        const { result } = renderHook(() =>
            useMorfix({
                initialValues,
                onSubmit
            })
        );

        await act(async () => {
            result.current.registerValidator('test', (value: string) => {
                if (value.length === 0) {
                    return {
                        mrfxError: 'Required'
                    };
                }

                return undefined;
            });

            await result.current.submit();
        });

        expect(onSubmit).toBeCalled();
    });
});
