import React from 'react';
import Meta from './meta';

export default class InstagramPost extends React.Component {
  render() {
    const mediaMarkup = this.createMediaMarkup()

    return (
        <section className="instagram-post">
          {mediaMarkup}
          <div className="instagram-caption">{this.props.caption}</div>
          <Meta source="Instagram" createdAt={this.props.createdAt} link={this.props.link} />
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
        <div className="instagram-video">Video</div>
      )
    }
  }
}

InstagramPost.propTypes = {
  mediaType: React.PropTypes.string.isRequired,
  mediaUrl: React.PropTypes.string.isRequired,
  caption: React.PropTypes.string,
  createdAt: React.PropTypes.instanceOf(Date).isRequired,
  link: React.PropTypes.string.isRequired,
}
