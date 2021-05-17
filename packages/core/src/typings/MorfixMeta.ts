import { MorfixErrors } from './MorfixErrors';
import { MorfixFormMeta } from './MorfixFormMeta';
import { MorfixTouched } from './MorfixTouched';

export type MorfixMeta<T> = {
    globalMeta: MorfixFormMeta;
    errors: MorfixErrors<T>;
    touched: MorfixTouched<T>;
};
