import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';

export const configureEnzyme = () => {
    configure({ adapter: new Adapter() });
};
