import React from 'react';
import Meta from './meta';
import ReactAutolink from 'react-autolink'

export default class Tweet extends React.Component {
  render() {
    return (
        <section className="tweet">
          <div className="text">{ReactAutolink.autolink(this.props.text)}</div>
          <Meta source="Twitter" createdAt={this.props.createdAt} url={this.props.url} />
        </section>
    );
  }
}

Tweet.propTypes = {
  createdAt: React.PropTypes.instanceOf(Date).isRequired,
  text: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
}
