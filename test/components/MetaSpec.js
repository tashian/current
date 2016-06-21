// file: test/component/MetaSpec.js
import { shallow } from 'enzyme';
import Meta from '../../shared/components/Meta';
import { expect } from 'chai';
import React from 'react';

describe('<Meta />', function(){
  it('renders the text', function() {
    const wrapper = shallow(<Meta source="Twitter" createdAt={new Date()} url="http://" />);
    expect(wrapper.find('.source').contains('Twitter')).to.be.true;
  });

  it('renders the Time', function() {
    const wrapper = shallow(<Meta source="Twitter" createdAt={new Date()} url="http://" />);
    expect(wrapper.find('Time')).to.have.length(1);
  })
});
