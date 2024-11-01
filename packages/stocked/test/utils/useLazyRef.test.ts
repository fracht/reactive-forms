import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useLazyRef } from '../../src/utils/useLazyRef';

describe('Lazy initializing test', () => {
	it('should initialize once', () => {
		const initializer = vi.fn();

		initializer.mockReturnValue(1);

		const { rerender } = renderHook(() => useLazyRef(initializer));

		rerender();
		rerender();
		rerender();
		rerender();

		expect(initializer).toBeCalledTimes(1);
	});

	it('should return initialized value', () => {
		const initializer = vi.fn();

		initializer.mockReturnValue(1);

		const { result } = renderHook(() => useLazyRef(initializer));

		expect(result.current.current).toBe(1);
	});
});
