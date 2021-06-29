import { useCallback, useEffect, useMemo, useRef } from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import { BatchUpdate } from 'stocked';
import invariant from 'tiny-invariant';
import { Schema } from 'yup';

import { MorfixControl, useMorfixControl } from './useMorfixControl';
import { useValidationRegistry, ValidationRegistryControl } from './useValidationRegistry';
import { MorfixHelpers } from '../typings';
import { FieldError } from '../typings/FieldError';
import { Empty, FieldValidator } from '../typings/FieldValidator';
import { FieldTouched } from '../typings/MorfixTouched';
import { SubmitAction } from '../typings/SubmitAction';
import { deepRemoveEmpty } from '../utils/deepRemoveEmpty';
import { excludeOverlaps } from '../utils/excludeOverlaps';
import { runYupSchema } from '../utils/runYupSchema';
import { setNestedValues } from '../utils/setNestedValues';

export type MorfixConfig<Values extends object> = {
    initialValues: Values;
    initialTouched?: FieldTouched<Values>;
    initialErrors?: FieldError<Values>;
    schema?: Schema<Partial<Values> | undefined>;
    onSubmit?: SubmitAction<Values>;
    validateForm?: FieldValidator<Values>;
    onValidationFailed?: (errors: FieldError<Values>) => void;
    shouldValidatePureFields?: boolean;
};

export type FieldObservers<V> = {
    valueObserver: (value: V) => void;
    errorObserver: (error: FieldError<V> | undefined) => void;
    touchObserver: (touched: FieldTouched<V> | undefined) => void;
    validator?: FieldValidator<V>;
};

export type MorfixResetConfig<V> = {
    initialValues?: V;
    initialTouched?: FieldTouched<V>;
    initialErrors?: FieldError<V>;
};

export type MorfixShared<Values extends object> = {
    submit: (action?: SubmitAction<Values>) => void;
    resetForm: (config?: MorfixResetConfig<Values>) => void;
} & MorfixControl<Values> &
    ValidationRegistryControl;

export const useMorfix = <Values extends object>({
    initialValues,
    initialErrors = {} as FieldError<Values>,
    initialTouched = {} as FieldTouched<Values>,
    onSubmit,
    schema,
    shouldValidatePureFields,
    validateForm: validateFormFn,
    onValidationFailed
}: MorfixConfig<Values>): MorfixShared<Values> => {
    const control = useMorfixControl({ initialValues, initialErrors, initialTouched });
    const validationRegistry = useValidationRegistry();

    const initialValuesRef = useRef(initialValues);
    const initialErrorsRef = useRef(initialErrors);
    const initialTouchedRef = useRef(initialTouched);

    initialValuesRef.current = initialValues;
    initialErrorsRef.current = initialErrors;
    initialTouchedRef.current = initialTouched;

    const { setFieldError, setErrors, setTouched, setValues, setFormMeta, getFormMeta, values, formMeta } = control;

    const {
        validateField: runFieldLevelValidation,
        validateAllFields,
        registerValidator: addValidatorToRegistry,
        unregisterValidator: removeValidatorFromRegistry,
        hasValidator
    } = validationRegistry;

    const validationValueObservers = useRef<Record<string, () => void>>({});

    const validateField = useCallback(
        async <V>(name: string, value: V) => {
            if (hasValidator(name)) {
                if (shouldValidatePureFields || !isEqual(value, get(initialValuesRef.current, name))) {
                    const error = await runFieldLevelValidation(name, value);
                    setFieldError(name, error);
                    return error;
                } else {
                    setFieldError(name, undefined);
                }
            }

            return undefined;
        },
        [runFieldLevelValidation, setFieldError, hasValidator, shouldValidatePureFields]
    );

    const runFormValidationSchema = useCallback(
        (values: Values): Promise<FieldError<Values> | undefined> => {
            if (!schema) return Promise.resolve(undefined);

            return runYupSchema(schema, values);
        },
        [schema]
    );

    const validateForm = useCallback(
        async (values: Values): Promise<FieldError<Values>> => {
            const registryErrors = await validateAllFields(values);
            const validateFormFnErrors: FieldError<Values> | Empty = await validateFormFn?.(values);
            const schemaErrors = await runFormValidationSchema(values);

            const allErrors = merge({}, registryErrors, validateFormFnErrors, schemaErrors);

            if (shouldValidatePureFields) {
                return allErrors;
            } else {
                return excludeOverlaps(values, initialValuesRef.current, allErrors) as FieldError<Values>;
            }
        },
        [runFormValidationSchema, validateAllFields, validateFormFn, shouldValidatePureFields]
    );

    const resetForm = useCallback(
        ({ initialErrors, initialTouched, initialValues }: MorfixResetConfig<Values> = {}) => {
            setValues(initialValues ?? initialValuesRef.current);
            setTouched(initialTouched ?? initialTouchedRef.current);
            setErrors(initialErrors ?? initialErrorsRef.current);
        },
        [setValues, setTouched, setErrors]
    );

    const morfixHelpers: MorfixHelpers<Values> = useMemo(
        () => ({
            ...control,
            validateField,
            validateForm,
            resetForm
        }),
        [control, resetForm, validateField, validateForm]
    );

    const submit = useCallback(
        async (action: SubmitAction<Values> | undefined = onSubmit) => {
            invariant(
                action,
                'Cannot call submit, because no action specified in arguments and no default action provided.'
            );

            setFormMeta('submitCount', getFormMeta<number>('submitCount') + 1);
            setFormMeta('isSubmitting', true);
            setFormMeta('isValidating', true);

            const currentValues = values.getValues();

            const newErrors = await validateForm(currentValues);

            setFormMeta('isValidating', false);

            setErrors(newErrors);
            setTouched(setNestedValues(currentValues, { mrfxTouched: true }));

            if (Object.keys(newErrors).length === 0) {
                await action(currentValues, morfixHelpers);
                setFormMeta('isSubmitting', true);
            } else {
                onValidationFailed?.(newErrors);
            }
        },
        [
            onSubmit,
            setFormMeta,
            getFormMeta,
            values,
            validateForm,
            setErrors,
            setTouched,
            onValidationFailed,
            morfixHelpers
        ]
    );

    const registerValidator = useCallback(
        <V>(name: string, validator: FieldValidator<V>) => {
            addValidatorToRegistry(name, validator);
            if (!Object.prototype.hasOwnProperty.call(validationValueObservers.current, name)) {
                validationValueObservers.current[name] = values.watch(name, (value) => validateField(name, value));
            }
        },
        [addValidatorToRegistry, validateField, values]
    );

    const unregisterValidator = useCallback(
        <V>(name: string, validator: FieldValidator<V>) => {
            removeValidatorFromRegistry(name, validator);
            if (!hasValidator(name) && Object.prototype.hasOwnProperty.call(validationValueObservers, name)) {
                validationValueObservers.current[name]();
                delete validationValueObservers.current[name];
            }
        },
        [hasValidator, removeValidatorFromRegistry]
    );

    const updateFormDirtiness = useCallback(
        ({ values }: BatchUpdate<unknown>) => setFormMeta('dirty', !isEqual(values, initialValuesRef.current)),
        [setFormMeta]
    );

    const updateFormValidness = useCallback(
        ({ values }: BatchUpdate<object>) => setFormMeta('isValid', deepRemoveEmpty(values) === undefined),
        [setFormMeta]
    );

    useEffect(() => values.watchBatchUpdates(updateFormDirtiness), [values, updateFormDirtiness]);

    useEffect(
        () =>
            formMeta.watchBatchUpdates((batchUpdate) => {
                const newPaths = batchUpdate.paths.filter((path) => path.indexOf('errors') === 0);

                if (newPaths.length > 0) {
                    updateFormValidness({
                        ...batchUpdate,
                        paths: newPaths
                    });
                }
            }),
        [formMeta, updateFormValidness]
    );

    return {
        submit,
        resetForm,
        ...validationRegistry,
        registerValidator,
        unregisterValidator,
        ...control
    };
};
