import React from 'react';
import Meta from './meta';

export default class MediumPost extends React.Component {
  render() {
    return (
        <section className="medium-post">
          <div className="text">{this.props.text}</div>
          <Meta source="Medium" createdAt={this.props.createdAt} url={this.props.url} />
        </section>
    );
  }
}

MediumPost.propTypes = {
  createdAt: React.PropTypes.instanceOf(Date).isRequired,
  text: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
}
