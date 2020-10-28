import { useCallback, useRef } from 'react';
import merge from 'lodash/merge';
import { Observer, Stock, useStock } from 'stocked';
import invariant from 'tiny-invariant';
import { Schema } from 'yup';

import { useValidationRegistry, ValidationRegistryControl } from './useValidationRegistry';
import { Empty, FieldValidator, MorfixErrors, MorfixTouched, SubmitAction } from '../typings';
import { runYupSchema } from '../utils/runYupSchema';
import { setNestedValues } from '../utils/setNestedValues';

export type MorfixConfig<Values extends object> = {
    initialValues: Values;
    initialTouched?: MorfixTouched<Values>;
    initialErrors?: MorfixErrors<Values>;
    schema?: Schema<Partial<Values> | undefined>;
    onSubmit?: SubmitAction<Values>;
    validateForm?: FieldValidator<Values>;
};

export type FieldObservers<V> = {
    valueObserver: (value: V) => void;
    errorObserver: (error: MorfixErrors<V> | undefined) => void;
    touchObserver: (touched: MorfixTouched<V> | undefined) => void;
    validator?: FieldValidator<V>;
};

export type MorfixShared<Values extends object> = {
    submit: (action?: SubmitAction<Values>) => void;
    values: Stock<Values>;
    touched: Stock<MorfixTouched<Values>>;
    errors: Stock<MorfixErrors<Values>>;
    validationRegistry: ValidationRegistryControl;
};

export const useMorfix = <Values extends object>({
    initialValues,
    initialErrors = {} as MorfixErrors<Values>,
    initialTouched = {} as MorfixTouched<Values>,
    onSubmit,
    schema,
    validateForm: validateFormFn
}: MorfixConfig<Values>): MorfixShared<Values> => {
    const values = useStock({ initialValues });
    const errors = useStock({ initialValues: initialErrors });
    const touched = useStock({ initialValues: initialTouched });

    const validationRegistry = useValidationRegistry();

    const {
        validateField: runFieldLevelValidation,
        validateAllFields,
        registerValidator: addValidatorToRegistry,
        unregisterValidator: removeValidatorFromRegistry,
        hasValidator
    } = validationRegistry;

    const validationValueObservers = useRef<Record<string, Observer<unknown>>>({});

    const validateField = useCallback(
        async <V>(name: string, value: V) => {
            if (hasValidator(name)) {
                const error = await runFieldLevelValidation(name, value);
                errors.setValue(name, error);
            }
        },
        [runFieldLevelValidation, errors, hasValidator]
    );

    const runFormValidationSchema = useCallback(
        (values: Values): Promise<MorfixErrors<Values> | undefined> => {
            if (!schema) return Promise.resolve(undefined);

            return runYupSchema(schema, values);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [schema]
    );

    const validateForm = useCallback(
        async (values: Values): Promise<MorfixErrors<Values>> => {
            const registryErrors = await validateAllFields(values);
            const validateFormFnErrors: MorfixErrors<Values> | Empty = await validateFormFn?.(values);
            const schemaErrors = await runFormValidationSchema(values);

            return merge({}, ...[registryErrors, validateFormFnErrors, schemaErrors].filter(Boolean));
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

            const newErrors = await validateForm(values.values.current);

            errors.setValues(newErrors);
            touched.setValues(setNestedValues(values.values.current, { mrfxTouched: true }));

            if (Object.keys(newErrors).length === 0) {
                action(values.values.current);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [errors, onSubmit, validateForm, values.values]
    );

    const registerValidator = useCallback(
        <V>(name: string, validator: FieldValidator<V>) => {
            addValidatorToRegistry(name, validator);
            if (!Object.prototype.hasOwnProperty.call(validationValueObservers.current, name)) {
                validationValueObservers.current[name] = (value) => validateField(name, value);
                values.observe(name, validationValueObservers.current[name]);
            }
        },
        [addValidatorToRegistry, validateField, values]
    );

    const unregisterValidator = useCallback(
        <V>(name: string, validator: FieldValidator<V>) => {
            removeValidatorFromRegistry(name, validator);
            if (!hasValidator(name)) {
                values.stopObserving(name, validationValueObservers.current[name]);
                delete validationValueObservers.current[name];
            }
        },
        [hasValidator, removeValidatorFromRegistry, values]
    );

    return {
        errors,
        touched,
        values,
        submit,
        validationRegistry: {
            ...validationRegistry,
            registerValidator,
            unregisterValidator
        }
    };
};
