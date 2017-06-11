module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ['eslint:recommended', 'google', 'plugin:flowtype/recommended', 'prettier', 'prettier/flowtype'],
    parserOptions: {
        ecmaVersion: 8,
        impliedStrict: true,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
        sourceType: 'module',
    },
    plugins: ['flowtype', 'prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                useTabs: false,
                printWidth: 120,
                tabWidth: 4,
                singleQuote: true,
                trailingComma: 'all',
                bracketSpacing: true,
                parser: 'flow',
                semi: true,
            },
        ],
        'no-console': 'off',
        'require-jsdoc': 'off',
        'no-irregular-whitespace': 'off',
        'flowtype/no-types-missing-file-annotation': 'off',
    },
};
