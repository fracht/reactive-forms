import { renderHook, waitFor } from '@testing-library/react';

import { useThrowError } from '../../src/utils/useThrowError';

describe('useThrowError', () => {
	it('should throw error', () => {
		const { result } = renderHook(() => useThrowError());

		waitFor(async () => {
			expect(() => result.current(new Error('error'))).toThrow();
		});
	});
});
