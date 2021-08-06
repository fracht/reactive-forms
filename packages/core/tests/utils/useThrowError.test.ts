import { act, renderHook } from '@testing-library/react-hooks';

import { useThrowError } from '../../src/utils/useThrowError';

describe('useThrowError', () => {
    it('should throw error', () => {
        const { result, rerender } = renderHook(() => useThrowError());

        act(() => {
            result.current(new Error('error'));
            rerender();
        });

        expect(result.error).toBeDefined();
    });
});
