/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
	transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|cjs|jsx)$'"],
	preset: 'ts-jest',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'cjs', 'mjs', 'json', 'node'],
	collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx,cjs,mjs}'],
	testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx,cjs,mjs}'],
	testEnvironmentOptions: {
		url: 'http://localhost',
	},
	testEnvironment: 'jsdom',
};

module.exports = config;
