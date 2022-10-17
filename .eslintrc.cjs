module.exports = {
  env: {
    browser: true,
    es2021: true,
    // node: true,
    commonjs: true
    // amd: true
  },
  extends: [
    // 'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    //"plugin:vue/essential", vue2 版本
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: { parser: '@typescript-eslint/parser' },
  //   parser: '@typescript-eslint/parser',
  //   parserOptions: {
  //     ecmaVersion: 'latest',
  //     sourceType: 'module'
  //   },
  plugins: ['vue', '@typescript-eslint'],
  rules: {}
}
