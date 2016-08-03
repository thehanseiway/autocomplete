import React, {Component} from 'react';

export default class AutocompleteItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.item.name}
            </div>
        );
    }
}
