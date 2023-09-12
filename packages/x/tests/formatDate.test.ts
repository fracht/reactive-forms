import { formatDate } from '../src/formatDate';

describe('format date', () => {
	it('should format correctly without pickTime option', () => {
		expect(formatDate(new Date(2023, 8, 12), false)).toBe('2023-09-12');
	});

	it('should format correctly with pickTime option', () => {
		expect(formatDate(new Date(2023, 8, 12, 17, 27, 42, 42), true)).toBe('2023-09-12 17:27');
	});
});
