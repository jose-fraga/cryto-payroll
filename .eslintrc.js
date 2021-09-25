//Path: /.eslintrc.js

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  rules: {
    strict: 0,
    'react/jsx-filename-extension': 'off',
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-extraneous-dependencies': 0,
    'implicit-arrow-linebreak': 1,
    'no-use-before-define': 0,
    //You can override any rules you want
  },
};
