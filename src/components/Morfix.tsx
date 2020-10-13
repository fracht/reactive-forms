import React from 'react';

import { MorfixProvider } from './MorfixContext';
import { MorfixConfig, useMorfix } from '../hooks/useMorfix';

export const Morfix = <Values extends object>({
    children,
    ...config
}: MorfixConfig<Values> & { children: React.ReactNode | React.ReactNodeArray }) => {
    const morfixBag = useMorfix(config);

    return <MorfixProvider value={morfixBag}>{children}</MorfixProvider>;
};
