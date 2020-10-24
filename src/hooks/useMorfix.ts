import { useCallback, useRef } from 'react';
import merge from 'lodash/merge';
import invariant from 'tiny-invariant';

import { MorfixErrorsStorage, MorfixTouchedStorage, MorfixValuesStorage, useMorfixStorage } from './useMorfixStorage';
import { ValidationRegistryControl } from './useValidationRegistry';
import { Empty, FieldValidator, MorfixErrors, SubmitAction } from '../typings';
import { Observer } from '../utils/FunctionArray';

export type MorfixConfig<Values extends object> = {
    initialValues: Values;
    onSubmit?: SubmitAction<Values>;
    validateForm?: FieldValidator<Values>;
};

export type MorfixShared<Values extends object> = MorfixValuesStorage<Values> &
    MorfixErrorsStorage<Values> &
    MorfixTouchedStorage<Values> &
    ValidationRegistryControl & {
        submit: (action?: SubmitAction<Values>) => void;
    };

export const useMorfix = <Values extends object>({
    initialValues,
    onSubmit,
    validateForm: validateFormFn
}: MorfixConfig<Values>): MorfixShared<Values> => {
    const [valuesStorage, errorsStorage, touchedStorage, validationRegistryControl] = useMorfixStorage({
        initialValues
    });

    const { values, observeValue, stopObservingValue } = valuesStorage;
    const { setFieldErrors, setFieldError } = errorsStorage;
    const {
        validateField: runFieldLevelValidation,
        validateAllFields,
        registerValidator: addValidatorToRegistry,
        unregisterValidator: removeValidatorFromRegistry,
        hasValidator
    } = validationRegistryControl;

    const validationValueObservers = useRef<Record<string, Observer<unknown>>>({});

    const validateField = useCallback(
        async <V>(name: string, value: V) => {
            if (hasValidator(name)) {
                const error = await runFieldLevelValidation(name, value);
                setFieldError(name, error);
                return error;
            }
            return undefined;
        },
        [runFieldLevelValidation, setFieldError, hasValidator]
    );

    const registerValidator = useCallback(
        <V>(name: string, validator: FieldValidator<V>) => {
            addValidatorToRegistry(name, validator);

            if (!Object.prototype.hasOwnProperty.call(validationValueObservers.current, name)) {
                validationValueObservers.current[name] = (value) => validateField(name, value);
                observeValue(name, validationValueObservers.current[name]);
            }
        },
        [addValidatorToRegistry, observeValue, validateField]
    );

    const unregisterValidator = useCallback(
        <V>(name: string, validator: FieldValidator<V>) => {
            removeValidatorFromRegistry(name, validator);

            if (!hasValidator(name)) {
                stopObservingValue(name, validationValueObservers.current[name]);
                delete validationValueObservers.current[name];
            }
        },
        [hasValidator, removeValidatorFromRegistry, stopObservingValue]
    );

    const validateForm = useCallback(
        async (values: Values): Promise<MorfixErrors<Values>> => {
            const registryErrors = await validateAllFields(values);
            const validateFormFnErrors: MorfixErrors<Values> | Empty = await validateFormFn?.(values);

            return merge(registryErrors, validateFormFnErrors);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [validateAllFields, validateFormFn]
    );

    const submit = useCallback(
        async (action: SubmitAction<Values> | undefined = onSubmit) => {
            invariant(
                action,
                'Cannot call submit, because no action specified in arguments and no default action provided.'
            );

            const errors = await validateForm(values.current);

            setFieldErrors(errors);

            if (Object.keys(errors).length === 0) {
                action(values.current);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [onSubmit, setFieldErrors, validateForm, values]
    );

    return {
        ...valuesStorage,
        ...errorsStorage,
        ...touchedStorage,
        ...validationRegistryControl,
        submit,
        registerValidator,
        unregisterValidator,
        validateField
    };
};
