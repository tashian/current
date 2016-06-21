import conf from '~/server/config';
import { expect } from 'chai';
import _ from 'underscore';

import Instagram from '~/server/feeds/instagram';
var sampleInstagramImage = require('./samples/instagram');

describe('Instagram', function() {
  describe('transformPost', function() {
    it('should correctly output a simplified JSON version of an image', function() {
      let ig = new Instagram();
      let transformedPost = ig.transformPost(sampleInstagramImage);
      expect(transformedPost.type).to.equal('InstagramPost');
      expect(transformedPost.caption).to.equal('Santa Fe adobe #throwback');
      expect(transformedPost.url).to.equal('https://www.instagram.com/p/BGYces2RP5h/');
      expect(transformedPost.createdAt).to.eql(new Date('2016-06-08T05:35:15.000Z'));
      expect(transformedPost.mediaType).to.equal('image')
    });

    it('should handle a missing caption', function() {
      let ig = new Instagram();
      let transformedPost = ig.transformPost(
        _.omit(sampleInstagramImage, 'caption'));
      expect(transformedPost.caption).to.equal('');
    })
  });
});
