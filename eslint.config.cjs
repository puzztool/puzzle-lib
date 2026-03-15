const config = require('gts/build/src/index.js');
const checkFile = require('eslint-plugin-check-file');
const {defineConfig} = require('eslint/config');

module.exports = defineConfig([
  ...config,
  {ignores: ['build/', 'vitest.config.ts']},
  {
    plugins: {'check-file': checkFile},
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {'**/!(*.d).ts': 'KEBAB_CASE'},
      ],
      'check-file/folder-naming-convention': [
        'error',
        {'src/**/': 'KEBAB_CASE', 'test/**/': 'KEBAB_CASE'},
      ],
    },
  },
]);
