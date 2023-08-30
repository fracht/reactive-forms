import { createContext } from 'react';

import { defaultErrorMessages, ErrorMessages } from './defaultErrors';

export const ErrorMessagesContext = createContext<ErrorMessages>(defaultErrorMessages);
