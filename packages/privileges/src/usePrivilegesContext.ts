import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { PrivilegesContext, PrivilegesContextType } from './PrivilegesContext';

export const usePrivilegesContext = <Values extends object>() => {
    const context = useContext(PrivilegesContext);

    invariant(context, "You're trying to access PrivilegesContext outside <ReactiveForm> tag");

    return context as unknown as PrivilegesContextType<Values>;
};
