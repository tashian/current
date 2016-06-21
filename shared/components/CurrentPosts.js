import React from 'react';
import request from 'axios';

import List from './List';

export default class CurrentPosts extends React.Component {
    static get NAME() {
        return 'CurrentPosts';
    }

    static get contextTypes() {
        return {
            data: React.PropTypes.object
        };
    }

    static requestData(params, domain = '') {
        return request.get('${domain}/api/feed.json');
    }

    constructor(props, context) {
        super(props, context);
        this.state = {posts: []};
    }

    render() {
        return (
            <section className="current-posts">
                <header className="section-header">
                    <h3 className="title">Current Posts</h3>
                </header>
                <section className="section-content">
                    <List items={this.state.posts}/>
                </section>
            </section>
        );
    }

    componentDidMount() {
        this.constructor.requestData().then((response) => {
            this.setState(response.data);
        }).catch((err) => {
            throw new Error(err);
        });
    }
}
