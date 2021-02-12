// .eslintrc.js
const process = require('process');
process.setMaxListeners(1);

module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    jest: false,
  },

  ignorePatterns: ["*.config.js"],
  overrides: [
    {
      files: ["*.js"],

      parserOptions: {
        sourceType: "module",
      },

      plugins: ["prettier"],

      extends: ["airbnb-base", "prettier"],
      rules: {
        "prettier/prettier": "error",

        // We really don't mind if this is off for property reassignments
        "no-param-reassign": ["error", { props: false }],
      },
      excludedFiles: ["*.config.js"],
    },

    {
      files: ["*.ts", "*.tsx", "*.vue"],

      parserOptions: {
        // parser: '@typescript-eslint/parser',
        // project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
        extraFileExtensions: ["vue"],
        // ecmaFeatures: {
        //   jsx: true,
        // },
        // Temporary fix for IDE issues with new files
        // createDefaultProgram: true,
      },

      // plugins: ['@typescript-eslint', 'vue', 'prettier'],
      plugins: ["vue", "vuetify"],

      extends: [
        // "airbnb-base",
        // 'plugin:@typescript-eslint/eslint-recommended',
        // 'plugin:@typescript-eslint/recommended',
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
        // "plugin:vue/recommended",
        // "prettier",
        // "prettier/vue",
        "vuetify",
      ],
      rules: {
        // "vuetify/no-deprecated-classes": "error",
        "vuetify/grid-unknown-attributes": "error",
        "vuetify/no-legacy-grid": "error",

        // "prettier/prettier": "error",

        // We really don't mind if this is off for property reassignments
        // "no-param-reassign": ["error", { props: false }],

        // These should already be handled by TypeScript
        // "import/no-unresolved": "off",

        // "@typescript-eslint/no-explicit-any": "error",
        // "@typescript-eslint/ban-ts-ignore": "error",
        // "@typescript-eslint/consistent-type-definitions": [
        //   "error",
        //   "interface",
        // ],
        // "@typescript-eslint/consistent-type-assertions": [
        //   "error",
        //   { assertionStyle: "never" },
        //   // In case we want to relax the rules
        //   // { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
        // ],
        // "@typescript-eslint/restrict-plus-operands": "error",
        // "@typescript-eslint/explicit-function-return-type": "error",

        // Empty interfaces are sometimes useful
        // "@typescript-eslint/no-empty-interface": "off",

        // Sometimes necessary
        // "import/prefer-default-export": "off",

        // Required for e.g. Vue components
        // "class-methods-use-this": "off",

        // AirBnb specific overrides
        // These are necessary because TypeScript re-implements these rules for compatibility reasons
        // This should be kept in sync with the current eslint-config-airbnb-base version
        // AirBnb rules:
        // https://github.com/airbnb/javascript/tree/eslint-config-airbnb-base-v13.2.0/packages/eslint-config-airbnb-base/rules
        // TypeScript overrides:
        // https://github.com/typescript-eslint/typescript-eslint/blob/v1.12.0/packages/eslint-plugin/src/configs/recommended.json
        // "@typescript-eslint/camelcase": ["error", { properties: "never" }],
        // "@typescript-eslint/no-array-constructor": "error",
        // "@typescript-eslint/no-unused-vars": "error",

        // eslint-plugin-import plugin extensions
        // https://github.com/airbnb/javascript/blob/eslint-config-airbnb-base-v13.2.0/packages/eslint-config-airbnb-base/rules/imports.js
        // "import/extensions": [
        //   "error",
        //   "ignorePackages",
        //   {
        //     js: "never",
        //     mjs: "never",
        //     jsx: "never",
        //     ts: "never",
        //     tsx: "never",
        //   },
        // ],
      },
    },
  ],
};
