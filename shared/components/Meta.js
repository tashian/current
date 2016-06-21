import React from 'react';
import Time from 'react-time';

export default class Meta extends React.Component {
  render() {
    return (
      <section className="meta">
        <div className="createdAt"><Time value={this.props.createdAt} relative /></div>
        <div className="source">via <a href={this.props.url}>{this.props.source}</a></div>
      </section>
    )
  }
};

Meta.propTypes = {
  createdAt: React.PropTypes.instanceOf(Date).isRequired,
  source: React.PropTypes.string,
  url: React.PropTypes.string
};
