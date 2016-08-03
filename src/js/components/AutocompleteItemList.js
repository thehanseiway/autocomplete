import React, {Component} from 'react';
import AutocompleteItem from './AutocompleteItem';

export default class AutocompleteItemList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const items = this.props.items.map(function items(item, index) {
            return (
                <li key={item.abbr}>
                    <AutocompleteItem details={item} selectItem={this.props.handleSelect} />
                </li>
            );
        }.bind(this));
        return (
            <ul>
                {items}
            </ul>
        );
    }
}
