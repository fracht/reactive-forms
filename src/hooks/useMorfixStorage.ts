import { MorfixErrors } from '../typings';
import { ObservableStorage, useObservableStorage } from './useObservableStorage';
import { useValidationRegistry, ValidationRegistryControl } from './useValidationRegistry';

export type MorfixStorageConfig<T extends object> = {
    initialValues: T;
    initialErrors?: MorfixErrors<T>;
};

export type MorfixValuesStorage<T extends object> = {
    values: ObservableStorage<T>['values'];
    setFieldValues: ObservableStorage<T>['setValues'];
    setFieldValue: ObservableStorage<T>['setValue'];
    observeValue: ObservableStorage<T>['observe'];
    stopObservingValue: ObservableStorage<T>['stopObserving'];
    isValueObserved: ObservableStorage<T>['isObserved'];
};

export type MorfixErrorsStorage<T extends object> = {
    errors: ObservableStorage<MorfixErrors<T>>['values'];
    setFieldErrors: ObservableStorage<MorfixErrors<T>>['setValues'];
    setFieldError: ObservableStorage<MorfixErrors<T>>['setValue'];
    observeError: ObservableStorage<MorfixErrors<T>>['observe'];
    stopObservingError: ObservableStorage<MorfixErrors<T>>['stopObserving'];
    isErrorObserved: ObservableStorage<MorfixErrors<T>>['isObserved'];
};

export type MorfixStorage<T extends object> = [
    MorfixValuesStorage<T>,
    MorfixErrorsStorage<T>,
    ValidationRegistryControl
];

export const useMorfixStorage = <T extends object>({
    initialValues,
    initialErrors = {} as MorfixErrors<T>
}: MorfixStorageConfig<T>): MorfixStorage<T> => {
    const {
        values,
        setValue: setFieldValue,
        setValues: setFieldValues,
        observe: observeValue,
        stopObserving: stopObservingValue,
        isObserved: isValueObserved
    } = useObservableStorage({ initialValues, debugName: 'values' });
    const {
        values: errors,
        setValue: setFieldError,
        setValues: setFieldErrors,
        observe: observeError,
        stopObserving: stopObservingError,
        isObserved: isErrorObserved
    } = useObservableStorage({
        initialValues: initialErrors,
        debugName: 'errors'
    });

    const registry = useValidationRegistry();

    return [
        {
            values,
            setFieldValue,
            setFieldValues,
            observeValue,
            stopObservingValue,
            isValueObserved
        },
        {
            errors,
            setFieldError,
            setFieldErrors,
            observeError,
            stopObservingError,
            isErrorObserved
        },
        registry
    ];
};
