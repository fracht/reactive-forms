import React from 'react';
import ReactiveForm, { createPluginArray, FormPlugins } from '@reactive-forms/core';
import { render } from '@testing-library/react';
import { createPxth } from 'pxth';

import { domPlugin, FieldValue } from '../src';

describe('FieldValue', () => {
	it('should render field value by default in Fragment', () => {
		const { getByText } = render(
			<FormPlugins plugins={createPluginArray(domPlugin)}>
				<ReactiveForm initialValues={{ test: 'hello' }}>
					<div>
						<FieldValue name={createPxth(['test'])} />
					</div>
				</ReactiveForm>
			</FormPlugins>,
		);

		expect(getByText('hello')).toBeDefined();
	});

	it('should render field value by as prop', () => {
		const { getByText } = render(
			<FormPlugins plugins={createPluginArray(domPlugin)}>
				<ReactiveForm initialValues={{ test: 'hello' }}>
					<FieldValue name={createPxth(['test'])} as="div" />
				</ReactiveForm>
			</FormPlugins>,
		);

		expect(getByText('hello')).toBeDefined();
	});
	it('should call function renderer', () => {
		const { getByText } = render(
			<FormPlugins plugins={createPluginArray(domPlugin)}>
				<ReactiveForm initialValues={{ test: 'hello' }}>
					<FieldValue name={createPxth<string>(['test'])}>{(value) => <span>{value}</span>}</FieldValue>
				</ReactiveForm>
			</FormPlugins>,
		);

		expect(getByText('hello')).toBeDefined();
	});
});
