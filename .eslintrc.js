module.exports = {
    // parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends:  [
        'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
        // 'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    parserOptions:  {
        ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
        sourceType:  'module',  // Allows for the use of imports
        // ecmaFeatures:  {
        //     jsx:  true,  // Allows for the parsing of JSX
        // },
    },
    settings:  {
        react:  {
            version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    "env": {
      "browser": true,
      "es6": true,
      "amd": true
    },
  // "extends": [
  //   "eslint:recommended",
  //   "plugin:react/recommended"
  // ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    // "parserOptions": {
    //     "ecmaFeatures": {
    //         "jsx": true
    //     },
    //     "ecmaVersion": 2018,
    //     "sourceType": "module"
    // },
    "plugins": [
        "react"
    ],
    "rules": {
      "react/prop-types": "off",
      "no-console": "off",
      "no-unused-vars":1
    }
};
