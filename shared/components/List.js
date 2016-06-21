import React from 'react';
import * as components from './components';

export default class List extends React.Component {
    render() {
        const items = this.props.items || [];
        const markupItems = this.createItemsMarkup(items);

        return (<ul className="ui-list">{markupItems}</ul>);
    }

    createItemsMarkup(items) {
        const markupItems = items.map((item) => {
            const Type = components[item.type];
            return (
                <li className="ui-list-item" key={item.id}>
                    <Type {...item}/>
                </li>
            );
        });

        return markupItems;
    }
}
