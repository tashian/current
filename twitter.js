// Twitter client
var Twttr = require('twitter');
var twitterClient = new Twttr({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

class Twitter {
  fetch() {
    twitterClient.get(
      'statuses/user_timeline',
      {screen_name: process.env.TWITTER_USERNAME},
      function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
        _.map(tweets, transformTweet);
      }
    });
  }

  transformTweet(tweet) {
    return {
      source: 'twitter',
      createdAt: new Date(tweet.created_at).toISOString(),
      text: tweet.text,
      link: 'https://twitter.com/' + process.env.TWITTER_USERNAME + '/status/' + tweet.id_str,
    }
  }

}

module.exports = Twitter
