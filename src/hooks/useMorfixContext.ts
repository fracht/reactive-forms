import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { MorfixContext, MorfixContextType } from '../components/MorfixContext';

export const useMorfixContext = (): MorfixContextType => {
    const context = useContext(MorfixContext);

    invariant(context, "You're trying to access MorfixContext outside <Morfix> tag");

    return context;
};
