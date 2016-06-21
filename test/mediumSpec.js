import { expect } from 'chai';
import _ from 'underscore';
import faker from 'faker';
import nock from 'nock';
import fs from 'fs';

import Medium from '~/server/feeds/medium';

describe('Medium', () => {
  describe('.fetch', () => {
    const aHost = faker.internet.url();
    const aPath = '/rss';
    const someUrl = `${aHost}${aPath}`;

    beforeEach( () => {
     nock(aHost).get(aPath)
       .reply(
         200,
         fs.readFileSync(`${__dirname}/samples/medium.rss`, 'utf-8')
       );
    });

    describe('successful', () => {
      it('grabs Medium posts', (done) => {
        const promise = Medium.transform(Medium.fetch(someUrl));

        promise.then((items) => {
          expect(items).to.have.length(9);
          done();
        }).catch((err) => {
          done(err);
        })
      })
    })
  })

  // describe('fetch', () => {
  //   it('should output a simplified JSON version of the tweet', function() {
  //     let medium = new Medium();
  //     medium.fetchFromFile('./samples/medium.rss');
  //     let transformedPost = medium.transformPost();
  //     expect(transformedTweet.type).to.equal('MediumPost');
  //     expect(transformedTweet.createdAt).to.equal('2016-04-08T22:12:56.000Z');
  //     expect(transformedTweet.text).to.equal('what about it struck you as particularly male?');
  //     expect(transformedTweet.url).to.equal('https://twitter.com/tashian/status/718562298936188928')
  //   })
  // })
});
