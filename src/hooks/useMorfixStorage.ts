import { ObservableStorage, useObservableStorage } from './useObservableStorage';
import { useValidationRegistry, ValidationRegistryControl } from './useValidationRegistry';
import { MorfixErrors, MorfixTouched } from '../typings';

export type MorfixStorageConfig<T extends object> = {
    initialValues: T;
    initialErrors?: MorfixErrors<T>;
    initialTouched?: MorfixTouched<T>;
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

export type MorfixTouchedStorage<T extends object> = {
    touched: ObservableStorage<MorfixTouched<T>>['values'];
    setAllTouched: ObservableStorage<MorfixTouched<T>>['setValues'];
    setFieldTouched: ObservableStorage<MorfixTouched<T>>['setValue'];
    observeTouched: ObservableStorage<MorfixTouched<T>>['observe'];
    stopObservingTouched: ObservableStorage<MorfixTouched<T>>['stopObserving'];
    isTouchedObserved: ObservableStorage<MorfixTouched<T>>['isObserved'];
};

export type MorfixStorage<T extends object> = [
    MorfixValuesStorage<T>,
    MorfixErrorsStorage<T>,
    MorfixTouchedStorage<T>,
    ValidationRegistryControl
];

export const useMorfixStorage = <T extends object>({
    initialValues,
    initialErrors = {} as MorfixErrors<T>,
    initialTouched = {} as MorfixTouched<T>
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

    const {
        values: touched,
        setValue: setFieldTouched,
        setValues: setAllTouched,
        observe: observeTouched,
        stopObserving: stopObservingTouched,
        isObserved: isTouchedObserved
    } = useObservableStorage({
        initialValues: initialTouched,
        debugName: 'touched'
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
        {
            touched,
            setFieldTouched,
            setAllTouched,
            observeTouched,
            stopObservingTouched,
            isTouchedObserved
        },
        registry
    ];
};
