import { expect } from 'chai';
import _ from 'underscore';

import Medium from '~/app/feeds/medium';

describe('Medium', function() {
  describe('transformPost', function() {
    it('should output a simplified JSON version of the tweet', function() {
      let medium = new Medium();
      medium.fetchFromFile('./samples/medium.rss');
      let transformedPost = medium.transformPost();
      expect(transformedTweet.source).to.equal('twitter');
      expect(transformedTweet.createdAt).to.equal('2016-04-08T22:12:56.000Z');
      expect(transformedTweet.text).to.equal('what about it struck you as particularly male?');
      expect(transformedTweet.link).to.equal('https://twitter.com/tashian/status/718562298936188928')
    })
  })
})
