import { useCallback, useEffect, useMemo, useRef } from 'react';
import cloneDeep from 'lodash/cloneDeep.js';
import isEqual from 'lodash/isEqual.js';
import merge from 'lodash/merge.js';
import mergeWith from 'lodash/mergeWith.js';
import { createPxth, deepGet, deepSet, Pxth } from 'pxth';
import { BatchUpdate } from 'stocked';
import invariant from 'tiny-invariant';
import type { BaseSchema } from 'yup';

import { useFormControl } from './useFormControl';
import { usePluginBagDecorators, usePluginConfigDecorators } from './usePlugins';
import { useValidationRegistry, ValidationRegistryControl } from './useValidationRegistry';
import { FieldError } from '../typings/FieldError';
import { FieldPostProcessor } from '../typings/FieldPostProcessor';
import { FieldTouched } from '../typings/FieldTouched';
import { FieldValidator } from '../typings/FieldValidator';
import { FormHelpers } from '../typings/FormHelpers';
import { FormMeta } from '../typings/FormMeta';
import { SubmitAction } from '../typings/SubmitAction';
import { deepRemoveEmpty } from '../utils/deepRemoveEmpty';
import { excludeOverlaps } from '../utils/excludeOverlaps';
import { mergeErrors } from '../utils/mergeErrors';
import { overrideMerge } from '../utils/overrideMerge';
import { runYupSchema } from '../utils/runYupSchema';
import { setNestedValues } from '../utils/setNestedValues';
import { useRefCallback } from '../utils/useRefCallback';
import { validatorResultToError } from '../utils/validatorResultToError';

export type InitialFormStateConfig<Values extends object> = {
	initialValues: Values;
	initialTouched?: FieldTouched<Values>;
	initialErrors?: FieldError<Values>;
};

export interface ExtendableFormConfig<Values extends object> {
	schema?: BaseSchema<Partial<Values> | undefined>;
	onSubmit?: SubmitAction<Values>;
	validateForm?: FieldValidator<Values>;
	onValidationFailed?: (errors: FieldError<Values>) => void;
	onValidationSucceed?: () => void;
	onReset?: (initialFormState: InitialFormState<Values>) => void;
	disablePureFieldsValidation?: boolean;
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

export type DefaultFormShared<Values extends object> = Omit<
	ValidationRegistryControl,
	'validateAllFields' | 'validateBranch'
> &
	FormHelpers<Values>;

export interface FormShared<Values extends object> extends DefaultFormShared<Values> {
	submit: (action?: SubmitAction<Values>) => void;
}

const deepCustomizer = (src1: unknown, src2: unknown) => {
	const filtered = [src1, src2].filter((a) => typeof a === 'object' && a !== null);

	if (filtered.length === 1) {
		return filtered[0];
	}
};

const formMetaPaths = createPxth<FormMeta>([]);

export const useForm = <Values extends object>(initialConfig: FormConfig<Values>): FormShared<Values> => {
	const config = usePluginConfigDecorators(initialConfig);

	const { schema, disablePureFieldsValidation } = config;

	const onSubmit = useRefCallback(config.onSubmit);
	const validateFormFn = useRefCallback(config.validateForm);
	const onValidationFailed = useRefCallback(config.onValidationFailed);
	const onValidationSucceed = useRefCallback(config.onValidationSucceed);
	const onReset = useRefCallback(config.onReset);
	const postprocessors = useRef<Array<FieldPostProcessor<unknown>>>([]);

	const paths = useMemo(() => createPxth<Values>([]), []);

	const {
		initialValues = {} as Values,
		initialErrors = {} as FieldError<Values>,
		initialTouched = {} as FieldTouched<Values>,
	} = config;

	const control = useFormControl({ initialValues, initialErrors, initialTouched });
	const { validateAllFields, hasValidator, validateBranch, registerValidator } = useValidationRegistry();

	const initialValuesRef = useRef(initialValues);
	const initialErrorsRef = useRef(initialErrors);
	const initialTouchedRef = useRef(initialTouched);

	const { setFieldError, setErrors, setTouched, setValues, setFormMeta, values, errors, getFieldValue } = control;

	const registerPostprocessor = useCallback(<V>(postprocessor: FieldPostProcessor<V>) => {
		postprocessors.current.push(postprocessor as FieldPostProcessor<unknown>);

		return () =>
			postprocessors.current.splice(
				postprocessors.current.indexOf(postprocessor as FieldPostProcessor<unknown>),
				1,
			);
	}, []);

	const postprocess = useCallback((values: Values) => {
		let processedValues = cloneDeep(values);
		postprocessors.current.forEach(({ path, update }) => {
			processedValues = deepSet(processedValues, path, update(deepGet(values, path))) as Values;
		});

		return processedValues;
	}, []);

	const normalizeErrors = useCallback(
		<V>(errors: FieldError<V>, source: object, compare: object): FieldError<V> => {
			if (!disablePureFieldsValidation) {
				return errors;
			}

			return merge(setNestedValues(errors as object, undefined), excludeOverlaps(source, compare, errors));
		},
		[disablePureFieldsValidation],
	);

	const validateField = useCallback(
		async <V>(name: Pxth<V>, value: V = getFieldValue(name)): Promise<FieldError<V> | undefined> => {
			const allValues = deepSet(cloneDeep(values.getValues()), name, value) as Values;

			const { errors } = await validateBranch(name, allValues);

			const valueErrors = deepGet(errors, name) as FieldError<V>;

			return normalizeErrors(
				valueErrors,
				deepGet(allValues, name) as object,
				deepGet(initialValuesRef.current, name) as object,
			);
		},
		[getFieldValue, normalizeErrors, validateBranch, values],
	);

	const runFormValidationSchema = useCallback(
		(values: Values): Promise<FieldError<Values> | undefined> => {
			if (!schema) return Promise.resolve(undefined);

			return runYupSchema(schema, values);
		},
		[schema],
	);

	const validateForm = useCallback(
		async (values: Values): Promise<FieldError<Values>> => {
			const registryErrors = await validateAllFields(values);
			const validateFormFnErrors: FieldError<Values> = validatorResultToError(await validateFormFn?.(values));
			const schemaErrors = await runFormValidationSchema(values);

			const allErrors =
				deepRemoveEmpty(mergeErrors({}, registryErrors, validateFormFnErrors, schemaErrors)) ?? {};

			if (!disablePureFieldsValidation) {
				return allErrors as FieldError<Values>;
			} else {
				return excludeOverlaps(values, initialValuesRef.current, allErrors) as FieldError<Values>;
			}
		},
		[runFormValidationSchema, validateAllFields, validateFormFn, disablePureFieldsValidation],
	);

	const updateFormDirtiness = useCallback(
		(values: Values) => setFormMeta(formMetaPaths.dirty, !isEqual(values, initialValuesRef.current)),
		[setFormMeta],
	);

	const resetForm = useCallback(
		(initialFormState?: InitialFormState<Values>) => {
			const nonNullableFormState = {
				initialValues: initialFormState?.initialValues ?? initialValuesRef.current,
				initialTouched: initialFormState?.initialTouched ?? initialTouchedRef.current,
				initialErrors: initialFormState?.initialErrors ?? initialErrorsRef.current,
			};

			const { initialErrors, initialTouched, initialValues } = nonNullableFormState;

			setValues(cloneDeep(initialValues));
			setTouched(cloneDeep(initialTouched));
			setErrors(cloneDeep(initialErrors));

			initialValuesRef.current = initialValues;
			initialErrorsRef.current = initialErrors;
			initialTouchedRef.current = initialTouched;

			onReset(nonNullableFormState);

			updateFormDirtiness(initialValues);
		},
		[setValues, setTouched, setErrors, onReset, updateFormDirtiness],
	);

	const helpers: FormHelpers<Values> = useMemo(
		() => ({
			...control,
			validateField,
			validateForm,
			resetForm,
			paths,
			registerPostprocessor,
		}),
		[control, validateField, validateForm, resetForm, paths, registerPostprocessor],
	);

	const submit = useCallback(
		async (action?: SubmitAction<Values> | undefined) => {
			if (typeof action !== 'function') {
				action = onSubmit;
			}

			invariant(
				action,
				'Cannot call submit, because no action specified in arguments and no default action provided.',
			);

			setFormMeta(formMetaPaths.submitCount, (prev) => prev + 1);
			setFormMeta(formMetaPaths.isSubmitting, true);
			setFormMeta(formMetaPaths.isValid, true);

			const currentValues = postprocess(values.getValues());

			const newErrors = await validateForm(currentValues);

			setFormMeta(formMetaPaths.isValid, false);

			setErrors(newErrors);
			setTouched(
				setNestedValues(
					mergeWith({}, cloneDeep(currentValues), cloneDeep(initialValuesRef.current), deepCustomizer),
					{
						$touched: true,
					},
				),
			);

			try {
				if (Object.keys(newErrors).length === 0) {
					onValidationSucceed?.();
					await action(currentValues, helpers);
				} else {
					onValidationFailed?.(newErrors);
				}
			} finally {
				setFormMeta(formMetaPaths.isSubmitting, false);
			}
		},
		[
			onSubmit,
			setFormMeta,
			values,
			validateForm,
			setErrors,
			setTouched,
			onValidationFailed,
			helpers,
			onValidationSucceed,
			postprocess,
		],
	);

	const updateFormValidness = useCallback(
		(values: object) => setFormMeta(formMetaPaths.isValid, deepRemoveEmpty(values) === undefined),
		[setFormMeta],
	);

	const validateUpdatedFields = useCallback(
		async ({ values, origin }: BatchUpdate<object>) => {
			const { attachPath, errors } = await validateBranch(origin, values);

			const onlyNecessaryErrors = deepGet(errors, attachPath) as FieldError<unknown>;
			const normalizedErrors = normalizeErrors(
				onlyNecessaryErrors,
				values,
				deepGet(initialValuesRef.current, attachPath) as object,
			);

			setFieldError(attachPath, (old) => overrideMerge(old ?? {}, normalizedErrors as object));
		},
		[normalizeErrors, setFieldError, validateBranch],
	);

	useEffect(() => {
		updateFormDirtiness(values.getValues());

		return values.watchBatchUpdates(({ values }) => updateFormDirtiness(values));
	}, [values, updateFormDirtiness]);

	useEffect(() => {
		updateFormValidness(errors.getValues());
		return errors.watchBatchUpdates((batchUpdate) => {
			if (batchUpdate.paths.length > 0) {
				updateFormValidness(batchUpdate.values);
			}
		});
	}, [errors, updateFormValidness]);

	useEffect(() => values.watchBatchUpdates(validateUpdatedFields), [values, validateUpdatedFields]);

	const bag: FormShared<Values> = {
		submit,
		hasValidator,
		registerValidator,
		...helpers,
	};

	const bagWithPlugins = usePluginBagDecorators(bag, config);

	return bagWithPlugins;
};
