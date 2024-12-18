module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: { project: ['./tsconfig.json'] },
    plugins: ['@typescript-eslint', 'react', 'react-native', 'jest', 'simple-import-sort'],
    extends: [
        '@react-native-community',
        'eslint:all',
        'plugin:@typescript-eslint/all',
        'plugin:react/all',
        'plugin:react-native/all',
        'plugin:jest/recommended',
        'prettier',
    ],
    rules: {
        '@typescript-eslint/array-type': [2, { default: 'generic' }],
        '@typescript-eslint/lines-between-class-members': 0, // Worsens the structure
        '@typescript-eslint/no-confusing-void-expression': [2, { ignoreArrowShorthand: true }],
        'one-var': 0, // Worsens the structure
        'simple-import-sort/exports': 2, // Enabling the plugin simple-import-sort
        'simple-import-sort/imports': 2, // Enabling the plugin simple-import-sort
        'sort-imports': 0, // We already use the simple-import-sort plugin
        'prefer-object-has-own': 0, // https://github.com/microsoft/TypeScript/issues/44253
        'no-inline-comments': 0, // Worsens the structure
        'line-comment-position': 0, // Worsens the structure
        'react-native/no-raw-text': 0, // Error prone
        'react/forbid-component-props': 0, // Not valid for React Native, because we want to use the style prop
        'react/function-component-definition': [
            2,
            { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
        ],
        'react/jsx-filename-extension': 0, // We use tsx files
        'react/jsx-max-depth': 0, // As long as the file remains uncluttered, this limitation only encourages more complex structures
        'react/jsx-no-literals': 0, // It is just more complicated to read

        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/init-declarations': 0,
        '@typescript-eslint/naming-convention': 0,
        '@typescript-eslint/no-dynamic-delete': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-magic-numbers': 0,
        '@typescript-eslint/no-require-imports': 0,
        '@typescript-eslint/no-type-alias': 0,
        '@typescript-eslint/no-unnecessary-condition': 0,
        '@typescript-eslint/no-unsafe-argument': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/prefer-readonly-parameter-types': 0,
        '@typescript-eslint/restrict-plus-operands': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/strict-boolean-expressions': 0,
        '@typescript-eslint/unbound-method': 0,
        borderWidth: 0,
        camelcase: 0,
        'class-methods-use-this': 0,
        'consistent-return': 0,
        'func-names': 0,
        'id-length': 0,
        'logical-assignment-operators': 0,
        'max-lines-per-function': 0,
        'max-params': 0,
        'max-statements': 0,
        'no-continue': 0,
        'no-duplicate-imports': 0,
        'no-magic-numbers': 0,
        'no-nested-ternary': 0,
        'no-ternary': 0,
        'no-undefined': 0,
        'no-underscore-dangle': 0,
        'no-warning-comments': 0,
        'react-native/no-color-literals': 0,
        'react/jsx-props-no-spreading': 0,
        'react/no-array-index-key': 0,
        'require-unicode-regexp': 0,
        'sort-keys': 0,
        'sort-vars': 0,
    },
};
