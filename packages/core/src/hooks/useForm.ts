import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import { BatchUpdate } from 'stocked';
import invariant from 'tiny-invariant';
import type { BaseSchema } from 'yup';

import { useFormControl } from './useFormControl';
import { usePlugins } from './usePlugins';
import { useValidationRegistry, ValidationRegistryControl } from './useValidationRegistry';
import { FieldError } from '../typings/FieldError';
import { FieldTouched } from '../typings/FieldTouched';
import { FieldValidator } from '../typings/FieldValidator';
import { FormHelpers } from '../typings/FormHelpers';
import { SubmitAction } from '../typings/SubmitAction';
import { deepRemoveEmpty } from '../utils/deepRemoveEmpty';
import { excludeOverlaps } from '../utils/excludeOverlaps';
import { loadingGuard } from '../utils/loadingGuard';
import { runYupSchema } from '../utils/runYupSchema';
import { setNestedValues } from '../utils/setNestedValues';
import { useRefCallback } from '../utils/useRefCallback';
import { useThrowError } from '../utils/useThrowError';
import { validatorResultToError } from '../utils/validatorResultToError';

export type InitialFormStateConfig<Values extends object> =
    | {
          initialValues: Values;
          initialTouched?: FieldTouched<Values>;
          initialErrors?: FieldError<Values>;
          load?: undefined;
      }
    | {
          load: () => Promise<InitialFormState<Values>>;
      };

export interface ExtendableFormConfig<Values extends object> {
    schema?: BaseSchema<Partial<Values> | undefined>;
    onSubmit?: SubmitAction<Values>;
    validateForm?: FieldValidator<Values>;
    onValidationFailed?: (errors: FieldError<Values>) => void;
    onValidationSucceed?: () => void;
    onReset?: (initialFormState: InitialFormState<Values>) => void;
    shouldValidatePureFields?: boolean;
}

export type FormConfig<Values extends object> = ExtendableFormConfig<Values> & InitialFormStateConfig<Values>;

export type FieldObservers<V> = {
    valueObserver: (value: V) => void;
    errorObserver: (error: FieldError<V> | undefined) => void;
    touchObserver: (touched: FieldTouched<V> | undefined) => void;
    validator?: FieldValidator<V>;
};

export type InitialFormState<V> = {
    initialValues: V;
    initialTouched?: FieldTouched<V>;
    initialErrors?: FieldError<V>;
};

export type DefaultFormShared<Values extends object> = Omit<ValidationRegistryControl, 'validateAllFields'> &
    FormHelpers<Values>;

export interface FormShared<Values extends object> extends DefaultFormShared<Values> {
    submit: (action?: SubmitAction<Values>) => void;
    isLoaded: boolean;
}

export const useForm = <Values extends object>(config: FormConfig<Values>): FormShared<Values> => {
    const throwError = useThrowError();

    const { schema, shouldValidatePureFields } = config;

    const onSubmit = useRefCallback(config.onSubmit);
    const validateFormFn = useRefCallback(config.validateForm);
    const onValidationFailed = useRefCallback(config.onValidationFailed);
    const onValidationSucceed = useRefCallback(config.onValidationSucceed);
    const onReset = useRefCallback(config.onReset);

    const {
        initialValues = {} as Values,
        initialErrors = {} as FieldError<Values>,
        initialTouched = {} as FieldTouched<Values>
    } = config.load
        ? {
              initialValues: undefined,
              initialErrors: undefined,
              initialTouched: undefined
          }
        : (config as {
              initialValues: Values;
              initialTouched?: FieldTouched<Values>;
              initialErrors?: FieldError<Values>;
          });

    const control = useFormControl({ initialValues, initialErrors, initialTouched });
    const validationRegistry = useValidationRegistry();

    const initialValuesRef = useRef(initialValues);
    const initialErrorsRef = useRef(initialErrors);
    const initialTouchedRef = useRef(initialTouched);

    const isPending = useRef(false);

    const { setFieldError, setErrors, setTouched, setValues, setFormMeta, getFormMeta, values, errors } = control;

    const {
        validateField: runFieldLevelValidation,
        validateAllFields,
        registerValidator: addValidatorToRegistry,
        hasValidator
    } = validationRegistry;

    const loadRef = useRef(config.load);
    loadRef.current = config.load;

    const [isLoaded, setIsLoaded] = useState(!config.load);

    const validationValueObservers = useRef<Record<string, () => void>>({});

    const validateField = useCallback(
        async <V>(name: string, value: V) => {
            if (hasValidator(name)) {
                if (shouldValidatePureFields || !isEqual(value, get(initialValuesRef.current, name))) {
                    const error = await runFieldLevelValidation(name, value);
                    setFieldError(name, (old) => ({ ...old, ...error }));
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
            const validateFormFnErrors: FieldError<Values> = validatorResultToError(await validateFormFn?.(values));
            const schemaErrors = await runFormValidationSchema(values);

            const allErrors = deepRemoveEmpty(merge({}, registryErrors, validateFormFnErrors, schemaErrors)) ?? {};

            if (shouldValidatePureFields) {
                return allErrors as FieldError<Values>;
            } else {
                return excludeOverlaps(values, initialValuesRef.current, allErrors) as FieldError<Values>;
            }
        },
        [runFormValidationSchema, validateAllFields, validateFormFn, shouldValidatePureFields]
    );

    const resetForm = useCallback(
        (initialFormState?: InitialFormState<Values>) => {
            const nonNullableFormState = {
                initialValues: initialFormState?.initialValues ?? initialValuesRef.current,
                initialTouched: initialFormState?.initialTouched ?? initialTouchedRef.current,
                initialErrors: initialFormState?.initialErrors ?? initialErrorsRef.current
            };

            const { initialErrors, initialTouched, initialValues } = nonNullableFormState;

            setValues(cloneDeep(initialValues));
            setTouched(cloneDeep(initialTouched));
            setErrors(cloneDeep(initialErrors));

            initialValuesRef.current = initialValues;
            initialErrorsRef.current = initialErrors;
            initialTouchedRef.current = initialTouched;

            onReset(nonNullableFormState);
        },
        [setValues, setTouched, setErrors, onReset]
    );

    const helpers: FormHelpers<Values> = useMemo(
        () => ({
            ...control,
            validateField,
            validateForm,
            resetForm
        }),
        [control, resetForm, validateField, validateForm]
    );

    const submit = useCallback(
        async (action?: SubmitAction<Values> | undefined) => {
            if (typeof action !== 'function') {
                action = onSubmit;
            }

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
            setTouched(setNestedValues(currentValues, { $touched: true }));

            try {
                if (Object.keys(newErrors).length === 0) {
                    onValidationSucceed?.();
                    await action(currentValues, helpers);
                } else {
                    onValidationFailed?.(newErrors);
                }
            } finally {
                setFormMeta('isSubmitting', false);
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
            helpers,
            onValidationSucceed
        ]
    );

    const registerValidator = useCallback(
        <V>(name: string, validator: FieldValidator<V>) => {
            const cleanup = addValidatorToRegistry(name, validator);
            if (!Object.prototype.hasOwnProperty.call(validationValueObservers.current, name)) {
                validationValueObservers.current[name] = values.watch(name, (value) => validateField(name, value));
            }

            return () => {
                cleanup();

                if (!hasValidator(name) && Object.prototype.hasOwnProperty.call(validationValueObservers, name)) {
                    validationValueObservers.current[name]();
                    delete validationValueObservers.current[name];
                }
            };
        },
        [addValidatorToRegistry, hasValidator, validateField, values]
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
            errors.watchBatchUpdates((batchUpdate) => {
                if (batchUpdate.paths.length > 0) {
                    updateFormValidness(batchUpdate);
                }
            }),
        [errors, updateFormValidness]
    );

    useEffect(() => {
        if (loadRef.current && !isPending.current && !isLoaded) {
            isPending.current = true;

            loadRef
                .current()
                .then(resetForm)
                .catch(throwError)
                .finally(() => {
                    setIsLoaded(true);
                    isPending.current = false;
                });
        }
    }, [resetForm, throwError, isLoaded]);

    const bag = {
        submit,
        resetForm,
        validateField,
        validateForm,
        registerValidator,
        hasValidator,
        isLoaded,
        ...control
    };

    const bagWithPlugins = usePlugins(bag, config);

    return loadingGuard(bagWithPlugins, isLoaded);
};
