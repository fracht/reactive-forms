import { FormHelpers } from './FormHelpers';

export type SubmitAction<Values extends object> = (values: Values, helpers: FormHelpers<Values>) => Promise<void>;
