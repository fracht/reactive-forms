import { MutableRefObject, useCallback } from 'react';
import invariant from 'tiny-invariant';

import { useObservableStorage } from './useObservableStorage';
import { useValidationRegistry } from './useValidationRegistry';
import { FieldValidator, MorfixErrors } from '../typings';
import { SubmitAction } from '../typings/SubmitAction';

export interface MorfixStorageConfig<Values extends object> {
    initialValues: Values;
    onSubmit?: SubmitAction<Values>;
}

export interface MorfixStorageShared<Values> {
    registerField: <V>(name: string, observers: FieldObservers<V>) => void;
    unregisterField: <V>(name: string, observers: FieldObservers<V>) => void;
    setFieldValue: <V>(name: string, value: V) => void;
    submit: (action?: SubmitAction<Values>) => void;
    values: MutableRefObject<Values>;
}

export type FieldObservers<V> = {
    valueObserver: (value: V) => void;
    errorObserver: (error: MorfixErrors<V> | undefined) => void;
    validator?: FieldValidator<V>;
};

export const useMorfixStorage = <Values extends object>({
    initialValues,
    onSubmit
}: MorfixStorageConfig<Values>): MorfixStorageShared<Values> => {
    const {
        values,
        setValue: setFieldValue,
        observe: observeValue,
        stopObserving: stopObservingValue,
        isObserved: isValueObserved
    } = useObservableStorage({ initialValues, debugName: 'values' });
    const {
        values: errors,
        setValue: setFieldError,
        observe: observeError,
        stopObserving: stopObservingError
    } = useObservableStorage<MorfixErrors<Values>>({
        initialValues: {} as MorfixErrors<Values>,
        debugName: 'errors'
    });

    const { registerValidator, unregisterValidator, validateField: runFieldLevelValidation } = useValidationRegistry();

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
