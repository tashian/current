// Instagram
var ig = require('instagram-node').instagram();
import _ from 'underscore';

export default class Instagram {
  fetch() {
    ig.use({
      access_token: process.env.INSTAGRAM_ACCESS_TOKEN
    });

    var ctx = this;
    ig.user_self_media_recent(function(err, posts) {
      if (!err) {
        console.log(posts[0]);
        return ctx.transform(posts);
      } else {
        console.log(err);
      }
    });
  }

  transform(posts) {
    return _.map(posts, this.transformPost);
  }

  transformPost(item) {
    return {
      source: 'Instagram',
      images: item.images,
      videos: item.videos,
      type: item.type,
      caption: item.caption ? item.caption.text : '',
      link: item.link,
      createdAt: new Date(parseInt(item.created_time) * 1000).toISOString()
    }
  }
}

export default Instagram;
