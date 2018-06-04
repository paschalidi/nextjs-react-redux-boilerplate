/**
 * Component Generator
 */

/* eslint strict: ["off"] */
'use strict';
const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add component / container',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: (value) => {
        if ((/.+/).test(value)) {
          return componentExists(value) ? 'A component or container with this name already exists' : true;
        }

        return 'The name is required';
      }
    }
  ],
  actions: () => {
    // Generate index.js and index.test.js
    return [{
      type: 'add',
      path: '../../components/{{properCase name}}/index.js',
      templateFile: './stateless/es6-stateless.js.hbs',
      abortOnFail: true
    }, {
      type: 'add',
      path: '../../components/{{properCase name}}/tests/index.test.js',
      templateFile: './stateless/test.js.hbs',
      abortOnFail: true
    }];
  }
};
