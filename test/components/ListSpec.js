// file: test/component/ListSpec.js
import { shallow, render } from 'enzyme';
import List from '../../shared/components/List';
import { expect } from 'chai';
import React from 'react';
import feedData from '../samples/feed'
import { renderToString }        from 'react-dom/server'

describe('<List />', function(){
  it('renders n items', function() {
    const wrapper = render(<List items={feedData.items} />);
    console.log(renderToString(<List items={feedData.items} />));
    expect(wrapper.find('li')).to.have.length(feedData.items.length);
  });

});
