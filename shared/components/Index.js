import React from 'react';

export default class AppView extends React.Component {
  render() {
    return (
      <section className="current-posts">
        <h3>Hi from React</h3>
        <hr />
        {this.props.children}
      </section>
    );
  }
}
