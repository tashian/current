import { expect } from 'chai';
import _ from 'underscore';
import faker from 'faker';
import nock from 'nock';
import fs from 'fs';

import Medium from '~/server/feeds/medium';

describe('Medium', () => {
  describe('.transform', () => {
    it('outputs JSON items', () => {
      const medium = new Medium();
      const posts = JSON.parse(
        fs.readFileSync(`${__dirname}/samples/medium.json`, 'utf-8')
      );
      const item = medium.transform(_.values(posts.payload.references.Post)[0]);

      expect(item.type).to.equal('MediumPost');
      expect(item.createdAt).to.eql(new Date('2016-06-27T05:32:51.205Z'));
      expect(item.text).to.equal('The Rocket Doesn’t Come With a Moral Compass');
      expect(item.url).to.equal(
        'https://medium.com/@tashian/the-rocket-doesnt-come-with-a-moral-compass-fb177866b713'
      );
      expect(item.previewImage).to.equal(
        'https://cdn-images-1.medium.com/max/425/1*fVqWra1yXhPIirUPPIGcwg.png'
      );
    });

  });

});
