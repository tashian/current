// Instagram
import conf from '~/server/config';
var ig = require('instagram-node').instagram();
import _ from 'underscore';

export default class Instagram {
  fetch() {
    ig.use({
      access_token:conf.get('INSTAGRAM_ACCESS_TOKEN')
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

  transformPost(post) {
    let simplifiedPost = {}
    if (post.type == 'video') {
      simplifiedPost.coverImageUrl = post.images.standard_resolution.url
      simplifiedPost.mediaUrl = post.videos
    } else {
      simplifiedPost.mediaUrl = post.images.standard_resolution.url
    }
    return Object.assign(simplifiedPost, {
      type: 'InstagramPost',
      images: post.images,
      videos: post.videos,
      mediaType: post.type,
      caption: post.caption ? post.caption.text : '',
      url: post.link,
      createdAt: new Date(parseInt(post.created_time) * 1000).toISOString()
    });
  }
}

export default Instagram;
