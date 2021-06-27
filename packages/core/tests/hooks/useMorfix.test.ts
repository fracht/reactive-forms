import { act, renderHook } from '@testing-library/react-hooks';

import { MorfixConfig, useMorfix } from '../../src';

describe('Test useMorfix functionality', () => {
    test('Test onValidationFailed function', () => {
        const formErrors = {
            test: {
                mrfxError: 'error message'
            }
        };

        const onSubmit = jest.fn();

        const config: MorfixConfig<{ test: string }> = {
            initialValues: {
                test: 'hello'
            },
            onSubmit,
            onValidationFailed: (errors) => {
                expect(errors).toStrictEqual(formErrors);
            },
            validateForm: () => formErrors,
            shouldValidatePureFields: true
        };

        const { result } = renderHook(() => useMorfix(config));

        act(() => {
            result.current.submit();
        });

        expect(onSubmit).toBeCalledTimes(0);
    });
});
