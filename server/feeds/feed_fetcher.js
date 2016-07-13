import Twitter from './twitter';
import Medium from './medium';
import Instagram from './instagram';
import _ from 'underscore';
import cache from 'memory-cache';

class FeedFetcher {
  constructor(fetchInterval = 5 * 60 * 1000) {
    cache.put('feedItems', {items: []});
    this.fetchInterval = fetchInterval;
  }

  start() {
    if (this.hasOwnProperty('intervalId')) {
      stop();
    }
    this.intervalId = setInterval(() => {
      this.fetchSortAndCacheFeeds();
    }, this.fetchInterval);
    this.fetchSortAndCacheFeeds();
  }

  stop() {
    if (!this.hasOwnProperty('intervalId')) {
      return;
    }
    clearInterval(this.intervalId);
    delete this.intervalId;
  }

  fetchSortAndCacheFeeds() {
    Promise.all(
      [(new Twitter()).fetch(),
       (new Instagram()).fetch(),
       (new Medium()).fetch()]
    ).then((items) => {
      this.cacheFeed(this._sortFeedItemsByDate(items));
    }).catch((error) => {
      console.log("Feed fetching error: ");
      console.log(error);
    });
  };

  cacheFeed(items) {
    cache.put('feedItems', {items: items});
  }

  get items() {
    return cache.get('feedItems');
  }

  _sortFeedItemsByDate(items) {
    return _.chain(items)
      .flatten()
      .sortBy(function(current) {
        return 0 - current.createdAt.getTime();
      })
      .value()
  }
};

export default new FeedFetcher();
