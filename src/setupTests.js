import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
// "husky": {
//     "hooks": {
//       "pre-commit": "lint-staged"
//     }
//   },
//   "lint-staged": {
//     "*.{js,jsx}": [
//       "eslint --no-ignore --fix",
//       "git add"
//     ]
//   }