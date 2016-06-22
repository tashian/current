// file: test/component/InstagramPostSpec.js
import { shallow } from 'enzyme';
import InstagramPost from '../../shared/components/InstagramPost';
import { expect } from 'chai';
import React from 'react';

describe('<InstagramPost />', function(){
  it('renders the caption', function() {
    const wrapper = shallow(<InstagramPost mediaType="image" width={50} height={50} src="http://" caption="dog" createdAt={new Date()} url="http://" />);
    expect(wrapper.find('.instagram-caption').contains('dog')).to.be.true;
  });

  it('renders the photo', function() {
    const wrapper = shallow(<InstagramPost mediaType="image" width={50} height={50} src="http://" caption="dog" createdAt={new Date()} url="http://" />);
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('renders the Meta', function() {
    const wrapper = shallow(<InstagramPost mediaType="image" width={50} height={50} src="http://" caption="dog" createdAt={new Date()} url="http://" />);
    expect(wrapper.find('Meta')).to.have.length(1);
  })
});
