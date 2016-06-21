// file: test/component/TweetSpec.js
import { shallow } from 'enzyme';
import Tweet from '../../shared/components/Tweet';
import { expect } from 'chai';
import React from 'react';

describe('<Tweet />', function(){
  it('renders the text', function() {
    const wrapper = shallow(<Tweet text="Hi" createdAt={new Date()} url="http://" />);
    expect(wrapper.find('.text').contains('Hi')).to.be.true;
  });

  it('renders the Meta', function() {
    const wrapper = shallow(<Tweet text="Hi" createdAt={new Date()} url="http://" />);
    expect(wrapper.find('Meta')).to.have.length(1);
  })
});
