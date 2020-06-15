module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: ['prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {},
}
