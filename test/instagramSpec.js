import conf from '~/server/config';
import { expect } from 'chai';
import _ from 'underscore';

import Instagram from '~/server/feeds/instagram';
import { image as sampleImage, video as sampleVideo } from './samples/instagram';

describe('Instagram', function() {
  describe('image', function() {
    it('should correctly output a simplified JSON version of an image', function() {
      let ig = new Instagram();
      let transformedPost = ig.transform(sampleImage);
      expect(transformedPost.type).to.equal('InstagramPost');
      expect(transformedPost.caption).to.equal('Santa Fe adobe #throwback');
      expect(transformedPost.url).to.equal('https://www.instagram.com/p/BGYces2RP5h/');
      expect(transformedPost.createdAt).to.eql(new Date('2016-06-08T05:35:15.000Z'));
      expect(transformedPost.mediaType).to.equal('image');
      expect(transformedPost.width).to.equal(640);
      expect(transformedPost.height).to.equal(640);
    });

    it('should handle a missing caption', function() {
      let ig = new Instagram();
      let transformedPost = ig.transform(
        _.omit(sampleImage, 'caption'));
      expect(transformedPost.caption).to.equal('');
    })
  });

  describe('video', function() {
    it('should correctly output a simplified JSON version of a video', function() {
      let ig = new Instagram();
      let transformedPost = ig.transform(sampleVideo);
      expect(transformedPost.type).to.equal('InstagramPost');
      expect(transformedPost.mediaType).to.equal('video');
      expect(transformedPost.src).to.equal('https://scontent.cdninstagram.com/t50.2886-16/13327259_556903831155293_502830147_n.mp4')
      expect(transformedPost.posterImageUrl).to.equal('https://scontent.cdninstagram.com/t51.2885-15/s640x640/e15/13355654_1197013260310521_996324377_n.jpg?ig_cache_key=MTI2MzIwMjQ5MTM5OTczMzA1NQ%3D%3D.2');
      expect(transformedPost.width).to.equal(640);
      expect(transformedPost.height).to.equal(640);
    });
  });

});
