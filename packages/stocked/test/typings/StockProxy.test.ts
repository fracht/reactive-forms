import { createPxth } from 'pxth';
import { describe, expect, it } from 'vitest';

import { DummyProxy } from '../DummyProxy';

describe('Proxy activation', () => {
	it('should activate proxy', () => {
		const proxy = new DummyProxy(createPxth(['asdf']));
		proxy.activate();
		expect(Object.isFrozen(proxy)).toBeTruthy();
		expect(proxy.isActive()).toBeTruthy();
	});
	it('should not let to edit active proxy', () => {
		const proxy = new DummyProxy(createPxth(['asdf']));
		proxy.activate();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(() => ((proxy as any).path = 'asdfsdf')).toThrow();
	});
});
