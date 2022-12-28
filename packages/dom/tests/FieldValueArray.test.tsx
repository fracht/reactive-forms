import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { render } from '@testing-library/react';
import { createPxth } from 'pxth';

import { domPlugin, FieldValueArray } from '../src';

describe('FieldValueArray', () => {
	it('should pass correct object of values into children', () => {
		const initialValues = { test: 'hello', arr: [{ value: 'asdf' }], obj: { test: 42 } };

		const children = jest.fn(() => <div></div>);

		render(
			<FormPlugins plugins={createPluginArray(domPlugin)}>
				<ReactiveForm initialValues={initialValues}>
					<FieldValueArray<{ helloValue: string; asdf_value: string; numberValue: number }>
						helloValue={createPxth<string>(['test'])}
						asdf_value={createPxth<string>(['arr', '0', 'value'])}
						numberValue={createPxth<number>(['obj', 'test'])}
					>
						{children}
					</FieldValueArray>
				</ReactiveForm>
			</FormPlugins>,
		);

		expect(children).toBeCalledWith({
			helloValue: 'hello',
			asdf_value: 'asdf',
			numberValue: 42,
		});
	});
});
