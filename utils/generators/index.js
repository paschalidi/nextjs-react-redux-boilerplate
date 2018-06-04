/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const componentGenerator = require('./component/index.js');
const statelessGenerator = require('./stateless/index.js');
const pageGenerator = require('./page/index.js');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('stateless', statelessGenerator);
  plop.setGenerator('page', pageGenerator);
  plop.addHelper('directory', (comp) => {
    try {
      return `components/${comp}`;
    }
    catch (e) {
      return true;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
