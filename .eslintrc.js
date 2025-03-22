module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    "no-empty": "off",
    "no-unused-vars": 1,
    "no-console": "off",
    "vue/no-unused-components": "off",
    "no-mixed-spaces-and-tabs": 0, // disable rule
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
