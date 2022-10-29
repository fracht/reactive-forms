import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';
import { createPxth, deepGet, deepSet, Pxth } from 'pxth';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BatchUpdate } from 'stocked';
import invariant from 'tiny-invariant';

import { FieldError } from '../typings/FieldError';
import { FieldPostProcessor } from '../typings/FieldPostProcessor';
import { FieldTouched } from '../typings/FieldTouched';
import { FieldValidator } from '../typings/FieldValidator';
import { FormHelpers } from '../typings/FormHelpers';
import { FormMeta } from '../typings/FormMeta';
import { SubmitAction } from '../typings/SubmitAction';
import { deepRemoveEmpty } from '../utils/deepRemoveEmpty';
import { excludeOverlaps } from '../utils/excludeOverlaps';
import { loadingGuard } from '../utils/loadingGuard';
import { overrideMerge } from '../utils/overrideMerge';
import { runYupSchema } from '../utils/runYupSchema';
import { setNestedValues } from '../utils/setNestedValues';
import { useRefCallback as useReferenceCallback } from '../utils/useRefCallback';
import { useThrowError } from '../utils/useThrowError';
import { validatorResultToError } from '../utils/validatorResultToError';
import { useFormControl } from './useFormControl';
import { usePluginBagDecorators, usePluginConfigDecorators } from './usePlugins';
import { useValidationRegistry, ValidationRegistryControl } from './useValidationRegistry';
import type { BaseSchema } from 'yup';

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
	isLoaded: boolean;
}

const deepCustomizer = (source1: unknown, source2: unknown) => {
	const filtered = [source1, source2].filter((a) => typeof a === 'object' && a !== null);

	if (filtered.length === 1) {
		return filtered[0];
	}
};

const formMetaPaths = createPxth<FormMeta>([]);

// Const getInitialFormState = <Values extends object>(config: FormConfig<Values>): Partial<InitialFormState<Values>> => {
// 	If (config.load) {
// 		Return {
// 			InitialValues: undefined,
// 			InitialErrors: undefined,
// 			InitialTouched: undefined,
// 		};
// 	}

// 	Return {
// 		InitialValues: config.initialValues,
// 		InitialErrors: config.initialErrors,
// 		InitialTouched: config.initialTouched,
// 	};
// };

export const useForm = <Values extends object>(initialConfig: FormConfig<Values>): FormShared<Values> => {
	const config = usePluginConfigDecorators(initialConfig);

	const throwError = useThrowError();

	const { schema, disablePureFieldsValidation, load } = config;

	const onSubmit = useReferenceCallback(config.onSubmit);
	const validateFormFunction = useReferenceCallback(config.validateForm);
	const onValidationFailed = useReferenceCallback(config.onValidationFailed);
	const onValidationSucceed = useReferenceCallback(config.onValidationSucceed);
	const onReset = useReferenceCallback(config.onReset);
	const postprocessors = useRef<Array<FieldPostProcessor<unknown>>>([]);

	const paths = useMemo(() => createPxth<Values>([]), []);

	const {
		initialValues = {} as Values,
		initialErrors = {} as FieldError<Values>,
		initialTouched = {} as FieldTouched<Values>,
		// eslint-disable-next-line unicorn/consistent-destructuring
	} = config.load
		? {
				initialValues: undefined,
				initialErrors: undefined,
				initialTouched: undefined,
		  }
		: (config as {
				initialValues: Values;
				initialTouched?: FieldTouched<Values>;
				initialErrors?: FieldError<Values>;
		  });

	const control = useFormControl({ initialValues, initialErrors, initialTouched });
	const {
		validateField: runFieldLevelValidation,
		validateAllFields,
		hasValidator,
		validateBranch,
		registerValidator,
	} = useValidationRegistry();

	const initialValuesReference = useRef(initialValues);
	const initialErrorsReference = useRef(initialErrors);
	const initialTouchedReference = useRef(initialTouched);

	const isPending = useRef(false);

	const { setFieldError, setErrors, setTouched, setValues, setFormMeta, values, errors } = control;

	const loadReference = useRef(load);
	loadReference.current = load;

	const [isLoaded, setIsLoaded] = useState(!load);

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
		for (const { path, update } of postprocessors.current) {
			processedValues = deepSet(processedValues, path, update(deepGet(values, path))) as Values;
		}

		return processedValues;
	}, []);

	const validateField = useCallback(
		async <V>(name: Pxth<V>, value: V) => {
			if (hasValidator(name)) {
				if (!disablePureFieldsValidation || !isEqual(value, deepGet(initialValuesReference.current, name))) {
					const error = await runFieldLevelValidation(name, value);
					setFieldError(name, (old) => ({ ...old, ...error }));
					return error;
				} else {
					setFieldError(name, { $error: undefined } as FieldError<V>);
				}
			}

			return;
		},
		[runFieldLevelValidation, setFieldError, hasValidator, disablePureFieldsValidation],
	);

	const runFormValidationSchema = useCallback(
		(values: Values): Promise<FieldError<Values> | undefined> => {
			if (!schema) {
				return Promise.resolve() as Promise<undefined>;
			}

			return runYupSchema(schema, values);
		},
		[schema],
	);

	const validateForm = useCallback(
		async (values: Values): Promise<FieldError<Values>> => {
			const registryErrors = await validateAllFields(values);
			const validateFormFunctionErrors: FieldError<Values> = validatorResultToError(
				await validateFormFunction?.(values),
			);
			const schemaErrors = await runFormValidationSchema(values);

			const allErrors =
				deepRemoveEmpty(merge({}, registryErrors, validateFormFunctionErrors, schemaErrors)) ?? {};

			if (!disablePureFieldsValidation) {
				return allErrors as FieldError<Values>;
			} else {
				return excludeOverlaps(values, initialValuesReference.current, allErrors) as FieldError<Values>;
			}
		},
		[runFormValidationSchema, validateAllFields, validateFormFunction, disablePureFieldsValidation],
	);

	const resetForm = useCallback(
		(initialFormState?: InitialFormState<Values>) => {
			const nonNullableFormState = {
				initialValues: initialFormState?.initialValues ?? initialValuesReference.current,
				initialTouched: initialFormState?.initialTouched ?? initialTouchedReference.current,
				initialErrors: initialFormState?.initialErrors ?? initialErrorsReference.current,
			};

			const { initialErrors, initialTouched, initialValues } = nonNullableFormState;

			setValues(cloneDeep(initialValues));
			setTouched(cloneDeep(initialTouched));
			setErrors(cloneDeep(initialErrors));

			initialValuesReference.current = initialValues;
			initialErrorsReference.current = initialErrors;
			initialTouchedReference.current = initialTouched;

			onReset(nonNullableFormState);
		},
		[setValues, setTouched, setErrors, onReset],
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

			setFormMeta(formMetaPaths.submitCount, (previous) => previous + 1);
			setFormMeta(formMetaPaths.isSubmitting, true);
			setFormMeta(formMetaPaths.isValid, true);

			const currentValues = postprocess(values.getValues());

			const newErrors = await validateForm(currentValues);

			setFormMeta(formMetaPaths.isValid, false);

			setErrors(newErrors);
			setTouched(
				setNestedValues(
					mergeWith({}, cloneDeep(currentValues), cloneDeep(initialValuesReference.current), deepCustomizer),
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

	const updateFormDirtiness = useCallback(
		({ values }: BatchUpdate<unknown>) =>
			setFormMeta(formMetaPaths.dirty, !isEqual(values, initialValuesReference.current)),
		[setFormMeta],
	);

	const updateFormValidness = useCallback(
		({ values }: BatchUpdate<object>) => setFormMeta(formMetaPaths.isValid, deepRemoveEmpty(values) === undefined),
		[setFormMeta],
	);

	const validateUpdatedFields = useCallback(
		async ({ values, origin }: BatchUpdate<object>) => {
			const { attachPath, errors } = await validateBranch(origin, values);

			const onlyNecessaryErrors = deepGet(errors, attachPath);
			const normalizedErrors = disablePureFieldsValidation
				? merge(
						// eslint-disable-next-line unicorn/no-useless-undefined
						setNestedValues(onlyNecessaryErrors as object, undefined),
						excludeOverlaps(
							values,
							deepGet(initialValuesReference.current, attachPath) as object,
							onlyNecessaryErrors,
						),
				  )
				: onlyNecessaryErrors;

			setFieldError(attachPath, (old) => overrideMerge(old ?? {}, normalizedErrors as object));
		},
		[disablePureFieldsValidation, setFieldError, validateBranch],
	);

	useEffect(() => values.watchBatchUpdates(updateFormDirtiness), [values, updateFormDirtiness]);

	useEffect(
		() =>
			errors.watchBatchUpdates((batchUpdate) => {
				if (batchUpdate.paths.length > 0) {
					updateFormValidness(batchUpdate);
				}
			}),
		[errors, updateFormValidness],
	);

	useEffect(() => values.watchBatchUpdates(validateUpdatedFields), [values, validateUpdatedFields]);

	useEffect(() => {
		if (loadReference.current && !isPending.current && !isLoaded) {
			isPending.current = true;

			loadReference
				.current()
				.then(resetForm)
				.catch(throwError)
				.finally(() => {
					setIsLoaded(true);
					isPending.current = false;
				});
		}
	}, [resetForm, throwError, isLoaded]);

	const bag: FormShared<Values> = {
		submit,
		hasValidator,
		registerValidator,
		isLoaded,
		...helpers,
	};

	const bagWithPlugins = usePluginBagDecorators(bag, config);

	return loadingGuard(bagWithPlugins, isLoaded);
};
