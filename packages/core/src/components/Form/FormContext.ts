import { createContext } from 'react';

import { FormShared } from './useForm';

export type FormContextType<Values extends object> = FormShared<Values>;

export const FormContext = createContext<FormContextType<object> | undefined>(undefined);
