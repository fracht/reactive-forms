import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { renderComponent } from '../../src/utils/renderComponent';

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
    it('should render default element', () => {
        act(() => {
            render(
                renderComponent({
                    defaultComponent: 'span',
                    bag: {
                        'attr-test': 'test'
                    },
                    component: undefined,
                    children: undefined
                }),
                container
            );
        });

        expect(container.querySelector('span').getAttribute('attr-test')).toBe('test');
    });

    it('should render default element and pass children', () => {
        act(() => {
            render(
                renderComponent({
                    defaultComponent: 'span',
                    bag: {},
                    component: undefined,
                    children: 'Hello world!'
                }),
                container
            );
        });

        expect(container.querySelector('span').textContent).toBe('Hello world!');
    });

    it('should pass custom bag to element', () => {
        act(() => {
            render(
                renderComponent({
                    defaultComponent: 'span',
                    bag: {},
                    component: undefined,
                    elementComponentProps: {
                        'custom-prop': 'asdf'
                    }
                }),
                container
            );
        });

        expect(container.querySelector('span').getAttribute('custom-prop')).toBe('asdf');
    });

    it('should render custom component', () => {
        act(() => {
            render(
                renderComponent({
                    defaultComponent: 'span',
                    bag: {
                        prop: 'asdf'
                    },
                    component: ({ prop }) => <span>{prop}</span>
                }),
                container
            );
        });

        expect(container.querySelector('span').innerHTML).toBe('asdf');
    });

    it('should render custom component(element)', () => {
        act(() => {
            render(
                renderComponent({
                    defaultComponent: 'span',
                    bag: {
                        prop: 'asdf'
                    },
                    component: 'span'
                }),
                container
            );
        });

        expect(container.querySelector('span').getAttribute('prop')).toBe('asdf');
    });

    it('should render via children', () => {
        act(() => {
            render(
                renderComponent({
                    defaultComponent: 'span',
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

    it('should render custom component(element, without default specified)', () => {
        act(() => {
            render(
                renderComponent({
                    bag: {
                        prop: 'asdf'
                    },
                    component: 'span'
                }),
                container
            );
        });

        expect(container.querySelector('span').getAttribute('prop')).toBe('asdf');
    });

    it('should render custom component(element, without default specified)', () => {
        act(() => {
            render(
                renderComponent({
                    bag: {
                        pra: 'a'
                    },
                    elementComponentProps: {
                        prop: 'asdf'
                    },
                    component: 'span'
                }),
                container
            );
        });

        expect(container.querySelector('span').getAttribute('prop')).toBe('asdf');
    });
});

describe('exceptions', () => {
    it('should throw error, if both children and component specified', () => {
        expect(() =>
            renderComponent({
                defaultComponent: 'div',
                bag: {},
                children: () => <div></div>,
                component: 'div'
            })
        ).toThrow();
    });
    it('should throw error, if no renderer specified', () => {
        expect(() =>
            renderComponent({
                bag: {}
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
