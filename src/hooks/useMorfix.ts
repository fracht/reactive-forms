import { MutableRefObject, useCallback } from 'react';
import merge from 'lodash/merge';
import invariant from 'tiny-invariant';

import { useMorfixStorage } from './useMorfixStorage';
import { Empty, FieldValidator, MorfixErrors, MorfixTouched, SubmitAction } from '../typings';

export type MorfixConfig<Values extends object> = {
    initialValues: Values;
    onSubmit?: SubmitAction<Values>;
    validateForm?: FieldValidator<Values>;
};

export type FieldObservers<V> = {
    valueObserver: (value: V) => void;
    errorObserver: (error: MorfixErrors<V> | undefined) => void;
    touchObserver: (touched: MorfixTouched<V> | undefined) => void;
    validator?: FieldValidator<V>;
};

export type MorfixShared<Values> = {
    registerField: <V>(name: string, observers: Partial<FieldObservers<V>>) => void;
    unregisterField: <V>(name: string, observers: Partial<FieldObservers<V>>) => void;
    setFieldValue: <V>(name: string, value: V) => void;
    setFieldTouched: <V>(name: string, touched: MorfixTouched<V>) => void;
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
        { setFieldTouched, observeTouched, stopObservingTouched },
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
        <V>(name: string, { valueObserver, errorObserver, touchObserver, validator }: Partial<FieldObservers<V>>) => {
            if (!isValueObserved(name)) {
                observeValue(name, (value) => validateField(name, value));
            }

            if (valueObserver) observeValue(name, valueObserver);
            if (errorObserver) observeError(name, errorObserver);
            if (touchObserver) observeTouched(name, touchObserver);

            if (validator) {
                registerValidator(name, validator);
            }
        },
        [isValueObserved, observeValue, observeError, validateField, registerValidator, observeTouched]
    );

    const unregisterField = useCallback(
        <V>(name: string, { valueObserver, errorObserver, touchObserver, validator }: Partial<FieldObservers<V>>) => {
            if (valueObserver) stopObservingValue(name, valueObserver);
            if (errorObserver) stopObservingError(name, errorObserver);
            if (touchObserver) stopObservingTouched(name, touchObserver);

            if (validator) {
                unregisterValidator(name, validator);
            }
        },
        [stopObservingError, stopObservingValue, unregisterValidator, stopObservingTouched]
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
        setFieldTouched,
        submit,
        values
    };
};
