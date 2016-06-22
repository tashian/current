// Medium (RSS)
import conf from '~/server/config';
import FeedParser from 'feedparser-promised';
import _ from 'underscore';

class Medium {
  fetch(url = this.defaultUrl) {
    return FeedParser.parse(url).then((items) => {
      return _.map(items, this.transform);
    });
  }

  transform(item) {
    return {
      type: 'MediumPost',
      url: item.link,
      createdAt: new Date(item.pubDate),
      text: item.title
    }
  }

  get defaultUrl() {
    return('https://medium.com/feed/@' + conf.get('MEDIUM_USERNAME'));
  }

}

export default Medium;
