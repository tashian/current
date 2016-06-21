import React from 'react';
import Meta from './meta';

export default class InstagramPost extends React.Component {
  render() {
    const mediaMarkup = this.createMediaMarkup()

    return (
        <section className="instagram-post">
          {mediaMarkup}
          <div className="instagram-caption">{this.props.caption}</div>
          <Meta source="Instagram" createdAt={this.props.createdAt} url={this.props.url} />
        </section>
    );
  }

  createMediaMarkup() {
    if (this.props.mediaType == "image") {
      return (
        <div className="instagram-photo">
          <img src={this.props.mediaUrl} width="600" height="600" />
        </div>
      )
    } else {
      return (
        <div className="instagram-video">
          <video controls>
            <source src={this.props.mediaUrl} type="video/mp4" />
            {'I\'m sorry; your browser doesn\'t support HTML5 video in MP4 with H.264.'}
          </video>
        </div>
      )
    }
  }
}

InstagramPost.propTypes = {
  mediaType: React.PropTypes.string.isRequired,
  mediaUrl: React.PropTypes.string.isRequired,
  caption: React.PropTypes.string,
  createdAt: React.PropTypes.instanceOf(Date).isRequired,
  url: React.PropTypes.string.isRequired,
}
