import { act, renderHook } from '@testing-library/react';

import { useThrowError } from '../../src/utils/useThrowError';

describe('useThrowError', () => {
	it('should throw error', () => {
		const { result } = renderHook(() => useThrowError());

		const doErrorThrow = () => {
			act(() => {
				result.current(new Error('error'));
			});
		};

		expect(doErrorThrow).toThrow();
	});
});
