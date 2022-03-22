import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { createPxth, getPxthSegments } from 'pxth';
import { MappingProxy } from 'stocked';

import { ReactiveFormProvider, useForm } from '../../src';
import { useProxyInterception } from '../../src/hooks/useProxyInterception';

type ProxyValue = {
    id: number;
    person: {
        address: string;
        birthDate: Date;
    };
    languages: string[];
};

const renderUseProxyInterception = () => {
    const { result: bag } = renderHook(() =>
        useForm({
            initialValues: {
                values: {
                    real: {
                        person_id: 1,
                        data: {
                            p_address: 'hello',
                            p_birthDate: new Date()
                        },
                        learned_languages: ['EN', 'LT']
                    }
                }
            }
        })
    );

    const proxy = new MappingProxy<ProxyValue>(
        {
            id: createPxth<number>(['values', 'real', 'person_id']),
            person: {
                address: createPxth<string>(['values', 'real', 'data', 'p_address']),
                birthDate: createPxth<Date>(['values', 'real', 'data', 'p_birthDate'])
            },
            languages: createPxth<string[]>(['values', 'real', 'learned_languages'])
        },
        createPxth(['values', 'proxy'])
    );

    proxy.activate();

    const registerValidator = jest.fn();
    const validateField = jest.fn();

    const { result } = renderHook(() => useProxyInterception(proxy), {
        wrapper: ({ children }) => {
            return (
                <ReactiveFormProvider
                    formBag={{
                        ...bag.current,
                        registerValidator,
                        validateField
                    }}
                >
                    {() => children}
                </ReactiveFormProvider>
            );
        }
    });

    return { result, registerValidator, validateField };
};

describe('useProxyInterception', () => {
    it('registerValidator should register intercepted validator', () => {
        const { result, registerValidator } = renderUseProxyInterception();

        const proxiedFieldPath = createPxth(['values', 'proxy', 'person']);

        const validator = jest.fn();
        result.current.registerValidator(proxiedFieldPath, validator);

        expect(getPxthSegments(registerValidator.mock.calls[0][0])).toStrictEqual(['values', 'real', 'data']);

        const interceptedValidator = registerValidator.mock.calls[0][1];
        interceptedValidator({
            p_address: 'asdf',
            p_birthDate: new Date(100)
        });

        expect(validator.mock.calls[0][0]).toStrictEqual({
            address: 'asdf',
            birthDate: new Date(100)
        });
    });

    it('intercepted validateField should call real validateField with real values', () => {
        const { result, validateField } = renderUseProxyInterception();

        const proxiedFieldPath = createPxth(['values', 'proxy', 'person']);

        result.current.validateField(proxiedFieldPath, { address: 'asdf', birthDate: new Date(100) });
        expect(getPxthSegments(validateField.mock.calls[0][0])).toStrictEqual(['values', 'real', 'data']);
        expect(validateField.mock.calls[0][1]).toStrictEqual({
            p_address: 'asdf',
            p_birthDate: new Date(100)
        });
    });
});
