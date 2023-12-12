# Linting in FCS

### Introduction
This project uses both `eslint` and `prettier` for linting and formatting the code. This document provides a summary of the linting setup and the rules that are enforced.

### Formatting with Prettier
Prettier is used to enforce consistent formatting of the code. It is configured to throw warnings, not errors.

It's recommended to configure your code editor, such as VSCode, to format on save. This way, you'll always have a consistently formatted codebase.

To manually format your code, run the command:

```
npm run format
```

Current prettier config:
```
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf",
  "printWidth": 100,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```
### ESLint

#### Environment and Parser Options
The environment includes browser, node, and ES6.

The code is parsed as ES modules, and the ECMAScript version used is ES11.

#### ESLint Rules Explained
Below is a brief explanation of some of the notable rules set up in the ESLint config:

##### "prettier/prettier": "warn"
Ensures the code adheres to Prettier's formatting rules.

##### "no-unused-vars": "warn"
Throws a warning if a variable is declared but not used within a file.

##### "no-console": "off"
Allows the use of console logs in code without any errors or warnings.

##### "func-names": "off"
Disallows named function expressions.

Example:

```
// Named Function
const foo = function bar() {
  // some code
};

// Anon Function
const foo = function() {
  // some code
};
```

##### "no-case-declarations": "off"
This rule prevents variable declarations inside case clauses of a switch statement, as they could lead to unexpected behavior.

##### "no-prototype-builtins": "off"
Avoids calling prototype methods directly on objects. For example, instead of myObject.hasOwnProperty('propName'), it's safer to use Object.prototype.hasOwnProperty.call(myObject, 'propName').

##### "prefer-const": "error"
Recommends using const over let wherever possible.

##### "no-var": "error"
Enforces the use of let or const instead of var.

##### "eqeqeq": "warn"
Advocates for the use of === and !== over == and !=.

##### "no-eval": "error"
Advises against the use of the eval function due to potential security risks.

### Customizing Rules
You have the flexibility to modify the rules' severity:

Turn off a rule completely
Set it as an error (breaks the linting)
Only display a warning (does not break linting)
You can adjust these in the rules section of the ESLint configuration.

### Conclusion
For maintainable and consistent code, always make sure to lint your code before committing.