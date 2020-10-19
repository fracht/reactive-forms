import { MutableRefObject, useRef } from 'react';
import { cloneDeep, get, set } from 'lodash';
import invariant from 'tiny-invariant';

import { FieldValidator, MorfixErrors } from '../typings';
import { FieldMeta, FieldRegistry } from '../typings/FieldRegistry';
import { SubmitAction } from '../typings/SubmitAction';
import { FunctionArray } from '../utils/FunctionArray';
import { isInnerPath, normalizePath } from '../utils/pathUtils';
import { useLazyRef } from '../utils/useLazyRef';

export interface MorfixStorageConfig<Values extends object> {
    initialValues: Values;
    onSubmit?: SubmitAction<Values>;
}

export interface MorfixStorageShared<Values> {
    registerField: <V>(name: string, observers: FieldObservers<V>) => void;
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
    const values = useLazyRef(() => cloneDeep(initialValues));
    const errors = useRef<MorfixErrors<Values>>({} as MorfixErrors<Values>);

    const registry = useRef<FieldRegistry>({});

    const registerField = <V>(name: string, { valueObserver, errorObserver, validator }: FieldObservers<V>) => {
        name = normalizePath(name);

        if (!Object.prototype.hasOwnProperty.call(registry.current, name)) {
            registry.current[name] = {
                value: new FunctionArray(),
                error: new FunctionArray(),
                validator: new FunctionArray()
            };
        }

        const currentFieldMeta = registry.current[name] as FieldMeta<V>;

        currentFieldMeta.value.push(valueObserver);
        currentFieldMeta.error.push(errorObserver);
        if (validator) currentFieldMeta.validator.push(validator);

        valueObserver(get(values.current, name));
        errorObserver(get(errors.current, name));

        return registry.current[name];
    };

    const setFieldValue = <V>(name: string, value: V) => {
        set(values.current, name, value);

        const paths = Object.keys(registry.current).filter(
            (tempName) => isInnerPath(name, tempName) || name === tempName || isInnerPath(tempName, name)
        );

        paths.forEach((path) => {
            const currentField = registry.current[path];
            const value = get(values.current, path);
            validateField(path, value);
            currentField.value.call(typeof value === 'object' ? { ...value } : value);
        });
    };

    const validateField = async <V>(name: string, value?: V) => {
        name = normalizePath(name);
        const field = registry.current[name];

        if (field) {
            value = value ?? get(values.current, name);
            let error = await field.validator.lazyAsyncCall(value);
            if (!error || error === void 0) error = undefined;
            set(errors.current, name, error);
            field.error.call(error as MorfixErrors<V>);
        }
    };

    const submit = (action: SubmitAction<Values> | undefined = onSubmit) => {
        invariant(
            action,
            'Cannot call submit, because no action specified in arguments and no default action provided.'
        );

        action(values.current);
    };

    return {
        registerField,
        setFieldValue,
        submit,
        values
    };
};
