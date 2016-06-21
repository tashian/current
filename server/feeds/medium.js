// Medium (RSS)
import conf from '~/server/config';
import FeedParser from 'feedparser-promised';
import _ from 'underscore';

class Medium {
  static fetch(url = this.defaultUrl) {
    return FeedParser.parse(url);
  }

  static transform(feed) {
    return feed.then((items) => {
      return _.map(items, this.transformItem);
    });
  }

  static transformItem(item) {
    return {
      type: 'MediumPost',
      url: item.link,
      createdAt: new Date(item.pubDate),
      text: item.title
    }
  }

  static get defaultUrl() {
    return('https://medium.com/feed/@' + conf.get('MEDIUM_USERNAME'));
  }

}

export default Medium;
