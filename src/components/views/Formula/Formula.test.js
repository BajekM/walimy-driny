import React from 'react';
import { shallow } from 'enzyme';
import { FormulaComponent } from './Formula';

describe('Component Formula', () => {
  it('should render without crashing', () => {
    const component = shallow(<FormulaComponent />);
    expect(component).toBeTruthy();
  });
});
