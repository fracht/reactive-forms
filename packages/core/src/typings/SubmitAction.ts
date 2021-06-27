import { MorfixHelpers } from './MorfixHelpers';

export type SubmitAction<Values extends object> = (
    values: Values,
    morfixHelpers: MorfixHelpers<Values>
) => Promise<void>;
