import React, {Component} from 'react';

export default class AutocompleteItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="autocompleteItem">
                {this.props.details.name}
            </div>
        );
    }
}
