import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../src/renderComponent';

let container: HTMLDivElement = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('normal behaviour', () => {
    it('should render element and pass bag', () => {
        act(() => {
            render(
                renderComponent({
                    bag: {
                        'attr-test': 'test'
                    },
                    as: 'span',
                    children: undefined
                }),
                container
            );
        });

        expect(container.querySelector('span').getAttribute('attr-test')).toBe('test');
    });

    it('should render element and pass children', () => {
        act(() => {
            render(
                renderComponent({
                    bag: {},
                    as: 'span',
                    children: 'Hello world!'
                }),
                container
            );
        });

        expect(container.querySelector('span').textContent).toBe('Hello world!');
    });

    it('should pass elementProps to element', () => {
        act(() => {
            render(
                renderComponent({
                    bag: {},
                    as: 'span',
                    elementProps: {
                        'custom-prop': 'asdf'
                    }
                }),
                container
            );
        });

        expect(container.querySelector('span').getAttribute('custom-prop')).toBe('asdf');
    });

    it('should not pass elementProps to component', () => {
        const MockComponent = jest.fn(() => {
            return <div>Hello</div>;
        });

        act(() => {
            render(
                renderComponent({
                    bag: {},
                    as: MockComponent,
                    elementProps: {
                        'custom-prop': 'asdf'
                    }
                }),
                container
            );
        });

        expect(MockComponent).toBeCalledWith(expect.not.objectContaining({ 'custom-prop': 'asdf' }), expect.anything());
    });

    it('should render custom component', () => {
        act(() => {
            render(
                renderComponent({
                    as: ({ prop }) => <span>{prop}</span>,
                    bag: {
                        prop: 'asdf'
                    }
                }),
                container
            );
        });

        expect(container.querySelector('span').innerHTML).toBe('asdf');
    });

    it('should render via children function', () => {
        act(() => {
            render(
                renderComponent({
                    bag: {
                        prop: 'asdf'
                    },
                    children: ({ prop }) => <span>{prop}</span>
                }),
                container
            );
        });

        expect(container.querySelector('span').innerHTML).toBe('asdf');
    });
});

describe('exceptions', () => {
    it('should throw error, if no renderer specified', () => {
        expect(() =>
            renderComponent({
                bag: {},
                children: undefined
            })
        ).toThrow();

        expect(() =>
            renderComponent({
                bag: {},
                children: <div></div>
            })
        ).toThrow();
    });
});
