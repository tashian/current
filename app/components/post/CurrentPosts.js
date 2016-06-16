import React from 'react';
import axios from 'axios';

import List from '../common/List';
//import TwitterPost from './TwitterPost';
//import MediumPost from './MediumPost';

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
        return axios.get(`${domain}/api/posts`);
    }

    constructor(props, context) {
        super(props, context);
        this.state = context.data[CurrentPosts.NAME] || {items: []};
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

    componentDidMount() {
        this.constructor.requestData().then((response) => {
            this.setState(response.data);
        }).catch((err) => {
            throw new Error(err);
        });
    }
}
