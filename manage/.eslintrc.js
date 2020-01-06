module.exports = {
    extends: [
      'plugin:vue/recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: "babel-eslint",
      sourceType: "module",
      allowImportExportEverywhere: false
    },
    "env": {
      "browser": true,
      "es6": true,
    }
  }
