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
          <img src={this.props.src} width={this.props.width} height={this.props.height} />
        </div>
      )
    } else {
      return (
        <div className="instagram-video">
          <video controls className="video-js vjs-default-skin" preload="none" loop={true} poster={this.props.posterImageUrl} data-setup='{"aspectRatio":"1:1"}' width={this.props.width} height={this.props.height}>
            <source src={this.props.src} type='video/mp4' />
            <p className="vjs-no-js">
            {'I\'m sorry; your browser doesn\'t support HTML5 video in MP4 with H.264.'}
            </p>
          </video>
        </div>
      )
    }
  }
}

InstagramPost.propTypes = {
  caption: React.PropTypes.string,
  createdAt: React.PropTypes.instanceOf(Date).isRequired,
  url: React.PropTypes.string.isRequired,
  posterImageUrl: React.PropTypes.string,
  mediaType: React.PropTypes.string.isRequired,
  src: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
}
