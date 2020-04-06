import React from 'react';
import { shallow } from 'enzyme';
import { GoogleButtonComponent } from './GoogleButton';

describe('Component GoogleButton', () => {
  it('should render without crashing', () => {
    const component = shallow(<GoogleButtonComponent />);
    expect(component).toBeTruthy();
  });
});
