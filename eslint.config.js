import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    prettierConfig,
    {
        files: ['**/*.js'],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'warn',
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: 'function', next: '*' },
                { blankLine: 'always', prev: '*', next: 'function' },
            ],
            'no-multiple-empty-lines': ['error', { max: 1 }],
        },
    },
];