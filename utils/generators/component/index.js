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
      type: 'confirm',
      name: 'isContainer',
      message: 'Is container:',
      default: false
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      message: 'Do you want actions and reducers:',
      default: false
    },
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

    const actions = [{
      type: 'add',
      path: '../../components/{{properCase name}}/index.js',
      templateFile: './component/es6.js.hbs',
      abortOnFail: true
    }, {
      type: 'add',
      path: '../../components/{{properCase name}}/tests/index.test.js',
      templateFile: './component/test.js.hbs',
      abortOnFail: true
    }];
    return actions;
  }
};
