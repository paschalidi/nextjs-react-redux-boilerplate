import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
global.matchMedia = global.matchMedia || function() {
  return {
      matches : false,
      addListener : function() {},
      removeListener: function() {}
  }
}
configure({ adapter: new Adapter() })
