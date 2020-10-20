import { MutableRefObject, useCallback } from 'react';
import merge from 'lodash/merge';
import invariant from 'tiny-invariant';

import { useMorfixStorage } from './useMorfixStorage';
import { Empty, FieldValidator, MorfixErrors, SubmitAction } from '../typings';

export type MorfixConfig<Values extends object> = {
    initialValues: Values;
    onSubmit?: SubmitAction<Values>;
    validateForm?: FieldValidator<Values>;
};

export type FieldObservers<V> = {
    valueObserver: (value: V) => void;
    errorObserver: (error: MorfixErrors<V> | undefined) => void;
    validator?: FieldValidator<V>;
};

export type MorfixShared<Values> = {
    registerField: <V>(name: string, observers: FieldObservers<V>) => void;
    unregisterField: <V>(name: string, observers: FieldObservers<V>) => void;
    setFieldValue: <V>(name: string, value: V) => void;
    submit: (action?: SubmitAction<Values>) => void;
    values: MutableRefObject<Values>;
};

export const useMorfix = <Values extends object>({
    initialValues,
    onSubmit,
    validateForm: validateFormFn
}: MorfixConfig<Values>): MorfixShared<Values> => {
    const [
        { values, setFieldValue, observeValue, stopObservingValue, isValueObserved },
        { setFieldErrors, setFieldError, observeError, stopObservingError },
        {
            validateField: runFieldLevelValidation,
            validateAllFields,
            registerValidator,
            unregisterValidator,
            hasValidator
        }
    ] = useMorfixStorage({ initialValues });

    const validateField = useCallback(
        async <V>(name: string, value: V) => {
            if (hasValidator(name)) {
                const error = await runFieldLevelValidation(name, value);
                setFieldError(name, error);
            }
        },
        [runFieldLevelValidation, setFieldError, hasValidator]
    );

    const registerField = useCallback(
        <V>(name: string, { valueObserver, errorObserver, validator }: FieldObservers<V>) => {
            if (!isValueObserved(name)) {
                observeValue(name, (value) => validateField(name, value));
            }

            observeValue(name, valueObserver);
            observeError(name, errorObserver);

            if (validator) {
                registerValidator(name, validator);
            }
        },
        [isValueObserved, observeValue, observeError, validateField, registerValidator]
    );

    const unregisterField = useCallback(
        <V>(name: string, { valueObserver, errorObserver, validator }: FieldObservers<V>) => {
            stopObservingValue(name, valueObserver);
            stopObservingError(name, errorObserver);
            if (validator) {
                unregisterValidator(name, validator);
            }
        },
        [stopObservingError, stopObservingValue, unregisterValidator]
    );

    const validateForm = async (values: Values): Promise<MorfixErrors<Values>> => {
        const registryErrors = await validateAllFields(values);
        const validateFormFnErrors: MorfixErrors<Values> | Empty = await validateFormFn?.(values);

        return merge(registryErrors, validateFormFnErrors);
    };

    const submit = async (action: SubmitAction<Values> | undefined = onSubmit) => {
        invariant(
            action,
            'Cannot call submit, because no action specified in arguments and no default action provided.'
        );

        const errors = await validateForm(values.current);

        setFieldErrors(errors);

        if (Object.keys(errors).length === 0) {
            action(values.current);
        }
    };

    return {
        registerField,
        unregisterField,
        setFieldValue,
        submit,
        values
    };
};
