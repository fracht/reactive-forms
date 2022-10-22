import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { createPxth } from 'pxth';

import { domPlugin, FieldArray } from '../src';

describe('FieldArray', () => {
    it('should rerender after items array has changed', async () => {
        const { getByRole, getAllByRole, getByText, findAllByRole } = render(
            <FieldArray name={createPxth<number[]>(['test'])}>
                {(arrayHelpers) => (
                    <div>
                        {arrayHelpers.items.map((value, index) => (
                            <span role="span" key={index}>
                                {value}
                            </span>
                        ))}
                        <button
                            onClick={() => {
                                arrayHelpers.push(3);
                            }}
                        >
                            add item
                        </button>
                    </div>
                )}
            </FieldArray>,
            {
                wrapper: ({ children }) => (
                    <FormPlugins plugins={createPluginArray(domPlugin)}>
                        <ReactiveForm<{ test: number[] }> initialValues={{ test: [1, 2] }}>
                            {() => children}
                        </ReactiveForm>
                    </FormPlugins>
                )
            }
        );

        expect(getAllByRole('span').length).toBe(2);
        expect(getByText('1')).toBeDefined();

        waitFor(async () => {
            fireEvent.click(getByRole('button'));

            expect((await findAllByRole('span')).length).toBe(3);
        });
    });

    // it('should render custom component, if specified', () => {
    //     const RenderComponent = () => {
    //         return <div id="test">from render component</div>;
    //     };

    //     const wrapper = mount(
    //         <FormPlugins plugins={createPluginArray(domPlugin)}>
    //             <ReactiveForm initialValues={{}}>
    //                 {() => <FieldArray name={createPxth(['hello'])} as={RenderComponent} />}
    //             </ReactiveForm>
    //         </FormPlugins>
    //     );

    //     expect(wrapper.find('div').length).toBe(1);
    //     expect(wrapper.find('div').prop('id')).toBe('test');
    // });

    // it('should call function renderer', () => {
    //     const wrapper = mount(
    //         <FormPlugins plugins={createPluginArray(domPlugin)}>
    //             <ReactiveForm initialValues={{}}>
    //                 {() => <FieldArray name={createPxth(['hello'])}>{() => <div id="test" />}</FieldArray>}
    //             </ReactiveForm>
    //         </FormPlugins>
    //     );

    //     expect(wrapper.find('div').prop('id')).toBe('test');
    // });
});
