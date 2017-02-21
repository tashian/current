import { expect } from 'chai';
import _ from 'underscore';

import sampleTweet from './samples/twitter';
import Twitter from '~/server/feeds/twitter';

describe('Twitter', function() {
  describe('transform', function() {
    it('should output a simplified JSON version of the tweet', function() {
      let twitter = new Twitter();
      let transformedTweet = twitter.transform(sampleTweet);
      expect(transformedTweet.type).to.equal('Tweet');
      expect(transformedTweet.key).to.equal('twitter-718562298936188928');
      expect(transformedTweet.createdAt).to.eql(new Date('2016-04-08T22:12:56.000Z'));
      expect(transformedTweet.text).to.equal('what about it struck you as particularly male?');
      expect(transformedTweet.url).to.equal('https://twitter.com/tashian/status/718562298936188928')
    })
  })
});
