import { createContext } from 'react';

import { FormShared } from '../hooks/useForm';

export type FormContextType<Values extends object> = FormShared<Values>;

export const FormContext = createContext<FormContextType<object> | undefined>(undefined);
