import get from 'lodash/get';

import { useMorfixContext } from './useMorfixContext';
import { useNamedObservedState } from './useNamedObservedState';
import { MorfixErrors } from '../typings';

export const useObservedError = <V>(name: string): MorfixErrors<V> | undefined => {
    const { observeError: observe, stopObservingError: stopObserving, errors } = useMorfixContext();

    return useNamedObservedState({ observe, stopObserving, initialValue: () => get(errors.current, name), name });
};
