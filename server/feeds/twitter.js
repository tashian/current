// Twitter client
import conf from '~/server/config';
import Twttr from 'twitter';
import _ from 'underscore';

let twitterClient = new Twttr({
  consumer_key: conf.get('TWITTER_CONSUMER_KEY'),
  consumer_secret: conf.get('TWITTER_CONSUMER_SECRET'),
  access_token_key: conf.get('ACCESS_TOKEN_KEY'),
  access_token_secret: conf.get('ACCESS_TOKEN_SECRET')
});

class Twitter {
  fetch() {
    let getTweets = function(resolve, reject) {
      twitterClient.get(
        'statuses/user_timeline',
        {screen_name: conf.get('TWITTER_USERNAME')},
        function(error, tweets, response) {
          if (error) {
            reject(error);
            return;
          }

          resolve(tweets);
        }
      );
    }

    return new Promise(getTweets).then((tweets) => {
      return _.map(tweets, this.transform);
    });
  }

  transform(tweet) {
    return {
      type: 'Tweet',
      createdAt: new Date(tweet.created_at),
      text: tweet.text,
      url: 'https://twitter.com/' + conf.get('TWITTER_USERNAME') + '/status/' + tweet.id_str,
    }
  }

}

export default Twitter;
