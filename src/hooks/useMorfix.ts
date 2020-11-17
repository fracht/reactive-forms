import { useCallback, useEffect, useRef } from 'react';
import { get } from 'lodash';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import { BatchUpdate, Observer, Stock, useStock } from 'stocked';
import invariant from 'tiny-invariant';
import { Schema } from 'yup';

import { useValidationRegistry, ValidationRegistryControl } from './useValidationRegistry';
import { Empty, FieldValidator, MorfixErrors, MorfixTouched, SubmitAction } from '../typings';
import { MorfixMeta } from '../typings/MorfixMeta';
import { deepRemoveEmpty } from '../utils/deepRemoveEmpty';
import { excludeOverlaps } from '../utils/excludeOverlaps';
import { runYupSchema } from '../utils/runYupSchema';
import { setNestedValues } from '../utils/setNestedValues';

export type MorfixConfig<Values extends object> = {
    initialValues: Values;
    initialTouched?: MorfixTouched<Values>;
    initialErrors?: MorfixErrors<Values>;
    schema?: Schema<Partial<Values> | undefined>;
    onSubmit?: SubmitAction<Values>;
    validateForm?: FieldValidator<Values>;
    shouldValidatePureFields?: boolean;
};

export type FieldObservers<V> = {
    valueObserver: (value: V) => void;
    errorObserver: (error: MorfixErrors<V> | undefined) => void;
    touchObserver: (touched: MorfixTouched<V> | undefined) => void;
    validator?: FieldValidator<V>;
};

export type MorfixResetConfig<V> = {
    initialValues?: V;
    initialTouched?: MorfixTouched<V>;
    initialErrors?: MorfixErrors<V>;
};

export type MorfixShared<Values extends object> = {
    submit: (action?: SubmitAction<Values>) => void;
    resetForm: (config?: MorfixResetConfig<Values>) => void;
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
    shouldValidatePureFields,
    validateForm: validateFormFn
}: MorfixConfig<Values>): MorfixShared<Values> => {
    const values = useStock({ initialValues });
    const errors = useStock({ initialValues: initialErrors });
    const touched = useStock({ initialValues: initialTouched });
    const formMeta = useStock({ initialValues: initialFormMeta });

    const initialValuesRef = useRef(initialValues);
    const initialErrorsRef = useRef(initialErrors);
    const initialTouchedRef = useRef(initialTouched);

    initialValuesRef.current = initialValues;
    initialErrorsRef.current = initialErrors;
    initialTouchedRef.current = initialTouched;

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
                if (
                    shouldValidatePureFields ||
                    (!shouldValidatePureFields && !isEqual(value, get(initialValuesRef.current, name)))
                ) {
                    const error = await runFieldLevelValidation(name, value);
                    errors.setValue(name, error);
                } else {
                    errors.setValue(name, undefined);
                }
            }
        },
        [runFieldLevelValidation, errors, hasValidator, shouldValidatePureFields]
    );

    const runFormValidationSchema = useCallback(
        (values: Values): Promise<MorfixErrors<Values> | undefined> => {
            if (!schema) return Promise.resolve(undefined);

            return runYupSchema(schema, values);
        },
        [schema]
    );

    const validateForm = useCallback(
        async (values: Values): Promise<MorfixErrors<Values>> => {
            const registryErrors = await validateAllFields(values);
            const validateFormFnErrors: MorfixErrors<Values> | Empty = await validateFormFn?.(values);
            const schemaErrors = await runFormValidationSchema(values);

            const allErrors = merge({}, registryErrors, validateFormFnErrors, schemaErrors);

            if (shouldValidatePureFields) {
                return allErrors;
            } else {
                return excludeOverlaps(values, initialValuesRef.current, allErrors) as MorfixErrors<Values>;
            }
        },
        [runFormValidationSchema, validateAllFields, validateFormFn, shouldValidatePureFields]
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
        [errors, formMeta.values, onSubmit, setFormMetaValue, touched, validateForm, values.values]
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
        ({ values }: BatchUpdate<unknown>) => setFormMetaValue('dirty', !isEqual(values, initialValuesRef.current)),
        [setFormMetaValue]
    );

    const updateFormValidness = useCallback(
        ({ values }: BatchUpdate<object>) => setFormMetaValue('isValid', deepRemoveEmpty(values) === undefined),
        [setFormMetaValue]
    );

    const resetForm = useCallback(
        ({ initialErrors, initialTouched, initialValues }: MorfixResetConfig<Values> = {}) => {
            values.setValues(initialValues ?? initialValuesRef.current);
            touched.setValues(initialTouched ?? initialTouchedRef.current);
            errors.setValues(initialErrors ?? initialErrorsRef.current);
        },
        [errors, touched, values]
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
        resetForm,
        validationRegistry: {
            ...validationRegistry,
            registerValidator,
            unregisterValidator
        }
    };
};
