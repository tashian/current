import { expect } from 'chai';
import _ from 'underscore';

import sampleTweet from './samples/twitter';
import Twitter from '~/server/feeds/twitter';

describe('Twitter', function() {
  describe('transformTweet', function() {
    it('should output a simplified JSON version of the tweet', function() {
      let twitter = new Twitter();
      let transformedTweet = twitter.transformTweet(sampleTweet);
      expect(transformedTweet.type).to.equal('Tweet');
      expect(transformedTweet.createdAt).to.equal('2016-04-08T22:12:56.000Z');
      expect(transformedTweet.text).to.equal('what about it struck you as particularly male?');
      expect(transformedTweet.link).to.equal('https://twitter.com/tashian/status/718562298936188928')
    })
  })
});
