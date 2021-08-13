import { useCallback, useRef } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import invariant from 'tiny-invariant';

import { FieldError } from '../typings/FieldError';
import { FieldValidator } from '../typings/FieldValidator';
import { FunctionArray } from '../utils/FunctionArray';
import { validatorResultToError } from '../utils/validatorResultToError';

export type ValidationRegistry = Record<string, FunctionArray<FieldValidator<unknown>>>;

export type ValidationRegistryControl = {
    registerValidator: <V>(name: string, validator: FieldValidator<V>) => () => void;
    validateField: <V>(name: string, value: V) => Promise<FieldError<V> | undefined>;
    validateAllFields: <V extends object>(values: V) => Promise<FieldError<V>>;
    hasValidator: (name: string) => boolean;
};

export const useValidationRegistry = (): ValidationRegistryControl => {
    const registry = useRef<ValidationRegistry>({});

    const registerValidator = useCallback(<V>(name: string, validator: FieldValidator<V>) => {
        if (!Object.prototype.hasOwnProperty.call(registry.current, name)) {
            registry.current[name] = new FunctionArray();
        }
        registry.current[name].push(validator as FieldValidator<unknown>);

        return () => {
            const currentValidators: FunctionArray<FieldValidator<unknown>> | undefined = registry.current[name];

            invariant(currentValidators, 'Cannot unregister field validator on field, which was not registered');

            currentValidators.remove(validator as FieldValidator<unknown>);

            if (currentValidators.isEmpty()) delete registry.current[name];
        };
    }, []);

    const validateField = useCallback(async <V>(name: string, value: V): Promise<FieldError<V> | undefined> => {
        if (Object.prototype.hasOwnProperty.call(registry.current, name)) {
            const output = await (registry.current[name] as FunctionArray<FieldValidator<V>>).lazyAsyncCall(value);
            return validatorResultToError(output);
        }
        return undefined;
    }, []);

    const hasValidator = useCallback(
        (name: string) => Object.prototype.hasOwnProperty.call(registry.current, name),
        []
    );

    const validateAllFields = useCallback(async <V extends object>(values: V): Promise<FieldError<V>> => {
        const reducedErrors: FieldError<V> = {} as FieldError<V>;

        const allValidatorKeys = Object.keys(registry.current).sort((a, b) => a.length - b.length);

        for (const key of allValidatorKeys) {
            const error = await registry.current[key].lazyAsyncCall(get(values, key));
            if (error) {
                set(reducedErrors, key, validatorResultToError(error));
            }
        }

        return reducedErrors;
    }, []);

    return {
        registerValidator,
        validateField,
        validateAllFields,
        hasValidator
    };
};
