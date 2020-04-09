import React from 'react';
import { shallow } from 'enzyme';
import { DrinksComponent } from './Drinks';

describe('Component Drinks', () => {
  it('should render without crashing', () => {
    const component = shallow(<DrinksComponent />);
    expect(component).toBeTruthy();
  });
});
