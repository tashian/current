// Medium (RSS)
import conf from '~/server/config';
import _ from 'underscore';
import MediumFetcher from 'medium-node';

export default class Medium {
  fetch() {
    return new MediumFetcher(conf.get('MEDIUM_USERNAME')).fetch().then((payload) => {
      return _.map(_.values(payload.references.Post), this.transform);
    });
  }
  transform(post) {
    return {
      type: 'MediumPost',
      key: 'medium-' + post.id,
      url: 'https://medium.com/@' + conf.get('MEDIUM_USERNAME') + '/' + post.uniqueSlug,
      createdAt: new Date(post.createdAt),
      text: post.title,
      html: post.content.subtitle,
      readingTime: post.virtuals.readingTime,
      previewImage: 'https://cdn-images-1.medium.com/max/425/' + post.virtuals.previewImage.imageId
    }
  }
}
