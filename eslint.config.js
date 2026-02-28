const config = require('gts/build/src/index.js');
const {defineConfig} = require('eslint/config');

module.exports = defineConfig([
  ...config,
  {ignores: ['build/', 'vitest.config.ts']},
]);
