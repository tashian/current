import conf from '~/app/config';
import { expect } from 'chai';
import _ from 'underscore';

import Instagram from '~/app/feeds/instagram';
var sampleInstagramImage = require('./samples/instagram');

describe('Instagram', function() {
  describe('transformPost', function() {
    it('should correctly output a simplified JSON version of an image', function() {
      let ig = new Instagram();
      let transformedPost = ig.transformPost(sampleInstagramImage);
      expect(transformedPost.source).to.equal('Instagram');
      expect(transformedPost.type).to.equal('image');
      expect(transformedPost.caption).to.equal('Santa Fe adobe #throwback');
      expect(transformedPost.link).to.equal('https://www.instagram.com/p/BGYces2RP5h/');
      expect(transformedPost.createdAt).to.equal('2016-06-08T05:35:15.000Z');
    });

    it('should handle a missing caption', function() {
      let ig = new Instagram();
      let transformedPost = ig.transformPost(
        _.omit(sampleInstagramImage, 'caption'));
      expect(transformedPost.caption).to.equal('');
    })
  });
});
