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
        const promise = Medium.fetch(someUrl);

        promise.then((items) => {
          expect(items).to.have.length(9);
          done();
        }).catch((err) => {
          done(err);
        })
      })
    })

    it('outputs JSON items', (done) => {
      const promise = Medium.fetch(someUrl);

      promise.then((items) => {
        var item = Medium.transformItem(items[0]);
        expect(item.type).to.equal('MediumPost');
        expect(item.createdAt).to.eql(new Date('Tue, 31 May 2016 22:20:03 GMT'));
        expect(item.text).to.equal('"How Multi-User Dungeons taught me to program" in Free Code Camp');
        expect(item.url).to.equal('https://medium.freecodecamp.com/how-i-learned-to-program-f196a5a8bfd3?source=rss-3299ebce81f1------2');
        done();
      }).catch((err) => {
        done(err);
      })
    })

  })

});
