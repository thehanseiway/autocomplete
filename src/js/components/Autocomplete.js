import React, {Component} from 'react';

export default class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value};
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    onChange={this.props.onInputChange}
                    value={this.state.value}/>
            </div>
        )
    }
}
