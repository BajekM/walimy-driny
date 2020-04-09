import React from 'react';
import { shallow } from 'enzyme';
import { SocialsComponent } from './Socials';

describe('Component Socials', () => {
  it('should render without crashing', () => {
    const component = shallow(<SocialsComponent />);
    expect(component).toBeTruthy();
  });
});
