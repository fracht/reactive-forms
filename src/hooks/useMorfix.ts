import { useCallback, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import { BatchUpdate, Observer, Stock, useStock } from 'stocked';
import invariant from 'tiny-invariant';
import { Schema } from 'yup';

import { useValidationRegistry, ValidationRegistryControl } from './useValidationRegistry';
import { Empty, FieldValidator, MorfixErrors, MorfixTouched, SubmitAction } from '../typings';
import { MorfixMeta } from '../typings/MorfixMeta';
import { deepRemoveEmpty } from '../utils/deepRemoveEmpty';
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
    formMeta: Stock<MorfixMeta>;
    validationRegistry: ValidationRegistryControl;
};

const initialFormMeta: MorfixMeta = {
    dirty: false,
    isSubmitting: false,
    isValid: true,
    isValidating: false,
    submitCount: 0
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
    const formMeta = useStock({ initialValues: initialFormMeta });

    const validationRegistry = useValidationRegistry();

    const setFormMetaValue: (path: keyof MorfixMeta, value: unknown) => void = formMeta.setValue;

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

            return merge({}, registryErrors, validateFormFnErrors, schemaErrors);
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

            setFormMetaValue('submitCount', formMeta.values.current.submitCount + 1);
            setFormMetaValue('isSubmitting', true);
            setFormMetaValue('isValidating', true);

            const newErrors = await validateForm(values.values.current);

            setFormMetaValue('isValidating', false);

            errors.setValues(newErrors);
            touched.setValues(setNestedValues(values.values.current, { mrfxTouched: true }));

            if (Object.keys(newErrors).length === 0) {
                await action(values.values.current);
                setFormMetaValue('isSubmitting', true);
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

    const updateFormDirtiness = useCallback(
        ({ values }: BatchUpdate<unknown>) => setFormMetaValue('dirty', !isEqual(values, initialValues)),
        [setFormMetaValue, initialValues]
    );

    const updateFormValidness = useCallback(
        ({ values }: BatchUpdate<object>) => setFormMetaValue('isValid', deepRemoveEmpty(values) === undefined),
        [setFormMetaValue]
    );

    useEffect(() => {
        const valuesObserver = updateFormDirtiness;
        const errorsObserver = updateFormValidness;

        values.observeBatchUpdates(valuesObserver);
        errors.observeBatchUpdates(errorsObserver);

        return () => {
            values.stopObservingBatchUpdates(valuesObserver);
            errors.stopObservingBatchUpdates(errorsObserver);
        };
    }, [updateFormDirtiness, updateFormValidness, errors, values]);

    return {
        errors,
        touched,
        values,
        formMeta,
        submit,
        validationRegistry: {
            ...validationRegistry,
            registerValidator,
            unregisterValidator
        }
    };
};
