import React from 'react';
import { shallow } from 'enzyme';
import { ProductIdComponent } from './ProductId';

describe('Component ProductId', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProductIdComponent />);
    expect(component).toBeTruthy();
  });
});
