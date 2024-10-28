import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: [
			'**/node_modules',
			'**/dist',
			'**/test',
			'**/*.config.js',
			'**/*.test.js',
			'**/*.test.ts',
			'**/.tsup',
		],
	},
	...compat.extends(
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	),
	{
		plugins: {
			'@typescript-eslint': typescriptEslint,
			'simple-import-sort': simpleImportSort,
		},

		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: 'module',

			parserOptions: {
				ecmaFeatures: {},
			},
		},

		rules: {
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-empty-interface': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/ban-types': 'off',
			'no-console': 'warn',

			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
				},
			],

			'simple-import-sort/imports': [
				'warn',
				{
					groups: [
						[
							'^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
						],
						['^@?\\w'],
						['^\\u0000'],
						['^src', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^\\.\\.(?!/?$)', '^\\.\\./?$'],
					],
				},
			],
		},
	},
];
