module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "es6": true,
      "node": true
  },
  "globals": {
    "describe": true,
    "context": true,
    "it": true,
    "beforeEach": true,
    "afterEach": true
  },
  "extends": "airbnb",
  "rules": {
    "strict": "off",
    "comma-dangle": ["error", "never"],
    "prefer-rest-params": "off",
    "react/jsx-filename-extension": "off"
  }
};
