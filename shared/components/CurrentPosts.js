import React from 'react';
import request from 'axios';
import List from './List';
import feed from '../../server/feeds/feed_fetcher';

export default class CurrentPosts extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = feed.items;
    }

    render() {
        return (
            <section className="current-posts">
                <header className="section-header">
                    <h3 className="title">Current Posts</h3>
                </header>
                <section className="section-content">
                    <List items={this.state.items}/>
                </section>
            </section>
        );
    }
}
