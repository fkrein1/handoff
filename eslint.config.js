const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const reactCompiler = require('eslint-plugin-react-compiler');

module.exports = defineConfig([
	expoConfig,
	{
		ignores: ['dist/*'],
		plugins: {
			'react-compiler': reactCompiler,
		},
		rules: {
			'react-compiler/react-compiler': 'error',
			quotes: ['error', 'single', { avoidEscape: true }],
			semi: ['error', 'always'],
			'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
			'no-trailing-spaces': 'error',
			'comma-spacing': ['error', { before: false, after: true }],
			'keyword-spacing': ['error', { before: true, after: true }],
			'space-before-blocks': ['error', 'always'],
			'space-infix-ops': 'error',
			'block-spacing': ['error', 'always'],
			'arrow-spacing': ['error', { before: true, after: true }],
			'object-curly-spacing': ['error', 'always'],
			'array-bracket-spacing': ['error', 'never'],
			'indent': ['error', 'tab', {
				SwitchCase: 1,
				VariableDeclarator: 'first',
				outerIIFEBody: 1,
				MemberExpression: 1,
				FunctionDeclaration: { body: 1, parameters: 'first' },
				FunctionExpression: { body: 1, parameters: 'first' },
				CallExpression: { arguments: 'first' },
				ArrayExpression: 1,
				ObjectExpression: 1,
				ImportDeclaration: 1,
				flatTernaryExpressions: false,
				ignoreComments: false,
			}],
			'import/order': ['error', {
				groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
				'newlines-between': 'always',
				alphabetize: { order: 'asc', caseInsensitive: true },
			}],
		},
	}
]);
