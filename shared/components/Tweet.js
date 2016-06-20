import React from 'react';
import Meta from './meta';

export default class Tweet extends React.Component {
  render() {
    return (
        <section className="tweet">
          <div className="text">{this.props.text}</div>
          <Meta source="Twitter" createdAt={this.props.createdAt} link={this.props.link} />
        </section>
    );
  }
}

Tweet.propTypes = {
  createdAt: React.PropTypes.instanceOf(Date).isRequired,
  text: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
}
