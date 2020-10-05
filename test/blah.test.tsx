import React from 'react';
import ReactDOM from 'react-dom';

import Morfix from '../src';

describe('it', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Morfix initialValues={{}}>{() => <div></div>}</Morfix>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
