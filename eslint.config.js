import { ESLint } from "eslint";

export default new ESLint({
    baseConfig: {
        parser: '@typescript-eslint/parser',
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        env: {
            browser: true,
            es2021: true,
        },
        extends: [
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended', // Asegúrate de que este sea el último en la lista
        ],
        plugins: ['react', '@typescript-eslint', 'prettier'],
        rules: {
            'prettier/prettier': 'error',
            'react/prop-types': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
});
