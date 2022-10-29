import { render } from '@testing-library/react';
import React from 'react';

import { renderComponent } from '../src/renderComponent';

describe('normal behavior', () => {
	it('should render element and pass bag', () => {
		const { getByTestId } = render(
			renderComponent({
				bag: {
					'data-testid': 'test',
				},
				as: 'span',
				children: undefined,
			}),
		);

		expect(getByTestId('test')).toBeDefined();
	});

	it('should render element and pass children', () => {
		const { getByText } = render(
			renderComponent({
				bag: {},
				as: 'span',
				children: 'Hello world!',
			}),
		);

		expect(getByText('Hello world!')).toBeDefined();
	});

	it('should pass elementProps to element', () => {
		const { getByTestId } = render(
			renderComponent({
				bag: {},
				as: 'span',
				elementProps: {
					'data-testid': 'test',
				},
			}),
		);

		expect(getByTestId('test')).toBeDefined();
	});

	it('should not pass elementProps to component', () => {
		const MockComponent = jest.fn(() => {
			return <div>Hello</div>;
		});

		render(
			renderComponent({
				bag: {},
				as: MockComponent,
				elementProps: {
					'custom-prop': 'asdf',
				},
			}),
		);

		expect(MockComponent).toBeCalledWith(expect.not.objectContaining({ 'custom-prop': 'asdf' }), expect.anything());
	});

	it('should render custom component', () => {
		const { getByText } = render(
			renderComponent({
				as: ({ prop }: { prop: string }) => <span>{prop}</span>,
				bag: {
					prop: 'asdf',
				},
			}),
		);

		expect(getByText('asdf')).toBeDefined();
	});

	it('should render via children function', () => {
		const { getByText } = render(
			renderComponent({
				bag: {
					prop: 'asdf',
				},
				children: ({ prop }) => <span>{prop}</span>,
			}),
		);

		expect(getByText('asdf')).toBeDefined();
	});

	it('should render via children function (custom bag)', () => {
		const { getByText } = render(
			renderComponent({
				bag: {
					value: 'asdf',
				},
				childrenBag: 'asdf',
				children: (value) => <span>{value}</span>,
			}),
		);

		expect(getByText('asdf')).toBeDefined();
	});

	it('should render via children function (children bag null)', () => {
		const { getByTestId } = render(
			renderComponent({
				bag: {
					value: 'asdf',
				},
				childrenBag: null,
				children: (value) => <span data-testid="test">{value}</span>,
			}),
		);

		expect(getByTestId('test').innerHTML).toBe('');
	});
});

describe('exceptions', () => {
	it('should throw error, if no renderer specified', () => {
		expect(() =>
			renderComponent({
				bag: {},
				children: undefined,
			}),
		).toThrow();

		expect(() =>
			renderComponent({
				bag: {},
				children: <div></div>,
			}),
		).toThrow();
	});
});
