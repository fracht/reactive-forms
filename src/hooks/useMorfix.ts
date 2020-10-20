import { MutableRefObject, useCallback } from 'react';
import invariant from 'tiny-invariant';

import { useMorfixStorage } from './useMorfixStorage';
import { FieldValidator, MorfixErrors, SubmitAction } from '../typings';

export type MorfixConfig<Values extends object> = {
    initialValues: Values;
    onSubmit?: SubmitAction<Values>;
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
    onSubmit
}: MorfixConfig<Values>): MorfixShared<Values> => {
    const [
        { values, setFieldValue, observeValue, stopObservingValue, isValueObserved },
        { errors, setFieldError, observeError, stopObservingError },
        { validateField: runFieldLevelValidation, registerValidator, unregisterValidator }
    ] = useMorfixStorage({ initialValues });

    const validateField = useCallback(
        async <V>(name: string, value: V) => {
            const error = await runFieldLevelValidation(name, value);
            setFieldError(name, error);
        },
        [runFieldLevelValidation, setFieldError]
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

    const submit = (action: SubmitAction<Values> | undefined = onSubmit) => {
        invariant(
            action,
            'Cannot call submit, because no action specified in arguments and no default action provided.'
        );

        if (Object.keys(errors.current).length === 0) {
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
