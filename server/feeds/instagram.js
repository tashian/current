// Instagram
import conf from '~/server/config';
var ig = require('instagram-node').instagram();
import _ from 'underscore';

export default class Instagram {
  fetch() {
    let getInstagramPosts = function(resolve, reject) {
      ig.use({
        access_token:conf.get('INSTAGRAM_ACCESS_TOKEN')
      });

      ig.user_self_media_recent(function(err, posts) {
        if (!err) {
          resolve(posts);
        } else {
          reject(err);
        }
      });
    }

    return new Promise(getInstagramPosts).then((posts) => {
      return _.map(posts, this.transform);
    });
  }

  transform(post) {
    let simplifiedPost = {}

    let mediaResource = post.images.standard_resolution;
    if (post.type == 'video') {
      mediaResource = post.videos.standard_resolution;
      simplifiedPost.posterImageUrl = post.images.standard_resolution.url
    }
    simplifiedPost.src = mediaResource.url
    simplifiedPost.width = mediaResource.width
    simplifiedPost.height = mediaResource.height

    return Object.assign(simplifiedPost, {
      type: 'InstagramPost',
      images: post.images,
      videos: post.videos,
      mediaType: post.type,
      caption: post.caption ? post.caption.text : '',
      url: post.link,
      createdAt: new Date(parseInt(post.created_time) * 1000)
    });
  }
}
