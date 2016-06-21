// file: test/component/ListSpec.js
import { shallow } from 'enzyme';
import List from '../../shared/components/List';
import { expect } from 'chai';
import React from 'react';
import feedData from '../samples/feed'

describe('<List />', function(){
  it('renders n items', function() {
    const wrapper = shallow(<List items={feedData.items} />);
    expect(wrapper.find('li')).to.have.length(feedData.items.length);
  });

});
