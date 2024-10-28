import baseConfig from '@reactive-tools/eslint-config';

export default [
	{
		ignores: ['**/dist', '**/node_modules', '**/*.config.js'],
	},
	...baseConfig,
	{
		rules: {
			'@typescript-eslint/no-wrapper-object-types': 'off',
		},
	},
];
