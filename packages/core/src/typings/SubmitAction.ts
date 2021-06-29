import { MorfixHelpers } from './MorfixHelpers';

export type SubmitAction<Values extends object> = (values: Values, helpers: MorfixHelpers<Values>) => Promise<void>;
