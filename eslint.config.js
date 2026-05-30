import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    prettierConfig,
    {
        files: ['**/*.js'],
        ignores: ['eslint.config.js'],
        languageOptions: {
            sourceType: 'script',
            globals: globals.browser,
        },
        rules: {
            'no-unused-vars': 'off',
            'no-console': 'warn',
            'no-undef': 'off',
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: 'function', next: '*' },
                { blankLine: 'always', prev: '*', next: 'function' },
            ],
            'no-multiple-empty-lines': ['error', { max: 1 }],
        },
    },
];