import { useContext } from 'react';
import { PrivilegesContext, PrivilegesContextType } from '../PrivilegesContext';
import invariant from 'tiny-invariant';

export const usePrivilegesContext = <Values extends object>() => {
    const context = useContext(PrivilegesContext);

    invariant(context, "You're trying to access FormContext outside <ReactiveForm> tag");

    return context as unknown as PrivilegesContextType<Values>;
};
