import { useState } from 'react';

const NO_ERROR_SYMBOL = Symbol();

export const useThrowError = () => {
    const [error, setError] = useState<unknown>(NO_ERROR_SYMBOL);

    if (error !== NO_ERROR_SYMBOL) {
        throw error;
    }

    return setError;
};
