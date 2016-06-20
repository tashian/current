// file: test/component/ListSpec.js
import { shallow } from 'enzyme';
import List from '../../shared/components/common/List';
import { expect } from 'chai';
import React from 'react';

describe('<Meta />', function(){
  it('renders the text', function() {
    const wrapper = shallow(<Meta source="Twitter" createdAt={new Date()} link="http://" />);
    expect(wrapper.find('.source').contains('Twitter')).to.be.true;
  });

  it('renders the Time', function() {
    const wrapper = shallow(<Meta source="Twitter" createdAt={new Date()} link="http://" />);
    expect(wrapper.find('Time')).to.have.length(1);
  })
});
