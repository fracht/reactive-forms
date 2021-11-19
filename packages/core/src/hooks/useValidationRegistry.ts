import { useCallback, useRef } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import { createPxth, deepGet, deepSet, parseSegmentsFromString, Pxth, pxthToString, RootPath } from 'pxth';
import { isInnerPath, longestCommonPath } from 'stocked';
import invariant from 'tiny-invariant';

import { FieldError } from '../typings/FieldError';
import { FieldValidator } from '../typings/FieldValidator';
import { FunctionArray } from '../utils/FunctionArray';
import { validatorResultToError } from '../utils/validatorResultToError';

export type ValidationRegistry = Record<string | RootPath, FunctionArray<FieldValidator<unknown>>>;

export type ValidationRegistryControl = {
    validateBranch: <V>(origin: Pxth<V>, values: V) => Promise<{ attachPath: Pxth<V>; errors: FieldError<V> }>;
    registerValidator: <V>(name: Pxth<V>, validator: FieldValidator<V>) => () => void;
    validateField: <V>(name: Pxth<V>, value: V) => Promise<FieldError<V> | undefined>;
    validateAllFields: <V extends object>(values: V) => Promise<FieldError<V>>;
    hasValidator: <V>(name: Pxth<V>) => boolean;
};

export const useValidationRegistry = (): ValidationRegistryControl => {
    const registry = useRef({} as ValidationRegistry);

    const registerValidator = useCallback(<V>(name: Pxth<V>, validator: FieldValidator<V>) => {
        const objectKey = pxthToString(name);

        if (!Object.prototype.hasOwnProperty.call(registry.current, objectKey)) {
            registry.current[objectKey] = new FunctionArray();
        }
        registry.current[objectKey].push(validator as FieldValidator<unknown>);

        return () => {
            const currentValidators: FunctionArray<FieldValidator<unknown>> | undefined = registry.current[objectKey];

            invariant(currentValidators, 'Cannot unregister field validator on field, which was not registered');

            currentValidators.remove(validator as FieldValidator<unknown>);

            if (currentValidators.isEmpty()) delete registry.current[objectKey];
        };
    }, []);

    const validateField = useCallback(async <V>(name: Pxth<V>, value: V): Promise<FieldError<V> | undefined> => {
        const objectKey = pxthToString(name);
        if (Object.prototype.hasOwnProperty.call(registry.current, objectKey)) {
            const output = await (registry.current[objectKey] as FunctionArray<FieldValidator<V>>).lazyAsyncCall(value);
            return validatorResultToError(output);
        }
        return undefined;
    }, []);

    const hasValidator = useCallback(
        <V>(name: Pxth<V>) => Object.prototype.hasOwnProperty.call(registry.current, pxthToString(name)),
        []
    );

    const validateBranch = useCallback(
        async <V>(origin: Pxth<V>, values: V): Promise<{ attachPath: Pxth<V>; errors: FieldError<V> }> => {
            const stringifiedOrigin = pxthToString(origin);

            const pathsToValidate = Object.keys(registry.current)
                .filter(
                    (i) =>
                        isInnerPath(stringifiedOrigin, i) ||
                        isInnerPath(i, stringifiedOrigin) ||
                        i === stringifiedOrigin
                )
                .sort((a, b) => a.length - b.length);

            let errors: FieldError<V> = {} as FieldError<V>;

            for (const path of pathsToValidate) {
                const realPath = createPxth(parseSegmentsFromString(path));
                const error = await validateField(realPath, deepGet(values, realPath));
                errors = deepSet(errors, realPath, error) as FieldError<V>;
            }

            return { attachPath: createPxth(parseSegmentsFromString(longestCommonPath(pathsToValidate))), errors };
        },
        [validateField]
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
        hasValidator,
        validateBranch
    };
};
