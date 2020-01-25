module.exports = {
  root: true,

  env: {
    node: true,
    jest: true
  },

  extends: [
    "plugin:vue/recommended",
    "@vue/prettier",
    "plugin:cypress/recommended"
  ],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },

  parserOptions: {
    parser: "@typescript-eslint/parser"
  },

  extends: [
    "plugin:vue/recommended",
    "@vue/prettier",
    "plugin:cypress/recommended",
    "@vue/typescript"
  ]
};
