import React from 'react';
import { shallow } from 'enzyme';
import { IconComponent } from './Icon';

describe('Component Icon', () => {
  it('should render without crashing', () => {
    const component = shallow(<IconComponent />);
    expect(component).toBeTruthy();
  });
});
