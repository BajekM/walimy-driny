import React from 'react';
import { shallow } from 'enzyme';
import { DrinkIdComponent } from './DrinkId';

describe('Component DrinkId', () => {
  it('should render without crashing', () => {
    const component = shallow(<DrinkIdComponent />);
    expect(component).toBeTruthy();
  });
});
