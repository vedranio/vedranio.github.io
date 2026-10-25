import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  {
    ignores: ['dist/', '.astro/', 'public/', 'node_modules/', '.lighthouseci/', 'playwright-report/', 'test-results/'],
  },
  js.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: { globals: { ...globals.browser, ga: 'readonly' } },
    rules: {
      // Non-breaking spaces in page copy are intentional.
      'no-irregular-whitespace': ['error', { skipStrings: true, skipTemplates: true, skipJSXText: true }],
    },
  },
  {
    files: ['src/scripts/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['*.config.{js,mjs}', 'src/pages/*.js'],
    languageOptions: { globals: globals.node },
  },
  {
    // Tests run in Node but pass functions to the browser via page.evaluate().
    files: ['tests/**/*.mjs'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  {
    files: ['lighthouserc.cjs'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
  },
];
