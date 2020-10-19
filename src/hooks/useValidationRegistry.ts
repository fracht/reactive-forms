import { useRef } from 'react';
import invariant from 'tiny-invariant';

import { FieldValidator, MorfixErrors } from '../typings';
import { FunctionArray } from '../utils/FunctionArray';

export type ValidationRegistry = Record<string, FunctionArray<FieldValidator<unknown>>>;

export type ValidationRegistryControl = {
    registerValidator: <V>(name: string, validator: FieldValidator<V>) => void;
    unregisterValidator: <V>(name: string, validator: FieldValidator<V>) => void;
    validateField: <V>(name: string, value: V) => Promise<MorfixErrors<V> | undefined>;
};

export const useValidationRegistry = (): ValidationRegistryControl => {
    const registry = useRef<ValidationRegistry>({});

    const registerValidator = <V>(name: string, validator: FieldValidator<V>) => {
        if (!Object.prototype.hasOwnProperty.call(registry.current, name)) {
            registry.current[name] = new FunctionArray();
        }
        registry.current[name].push(validator as FieldValidator<unknown>);
    };

    const unregisterValidator = <V>(name: string, validator: FieldValidator<V>) => {
        const currentValidators: FunctionArray<FieldValidator<unknown>> | undefined = registry.current[name];

        invariant(currentValidators, 'Cannot unregister field validator on field, which was not registered');

        currentValidators.remove(validator as FieldValidator<unknown>);

        if (currentValidators.isEmpty()) delete registry.current[name];
    };

    const validateField = async <V>(name: string, value: V): Promise<MorfixErrors<V> | undefined> => {
        if (Object.prototype.hasOwnProperty.call(registry.current, name)) {
            const output = await (registry.current[name] as FunctionArray<FieldValidator<V>>).lazyAsyncCall(value);
            return output === void 0 || output === null ? undefined : output;
        }
        return undefined;
    };

    return {
        registerValidator,
        unregisterValidator,
        validateField
    };
};
