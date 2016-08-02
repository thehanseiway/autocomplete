import React, {Component} from 'react';
import AutocompleteItemList from './AutocompleteItemList';

export default class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', isOpen: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleFocus(event) {
        this.setState({isOpen: true});
    }

    handleBlur(event) {
        this.setState({isOpen: false});
    }

    renderList() {
        if (this.state.isOpen) {
            return (
                <AutocompleteItemList items={this.props.fetchData} />
            );
        }
    }

    render() {
        return (
            <div className="autoComplete">
                <input type="text"
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    value={this.state.value}
                />

                {this.renderList()}
            </div>
        );
    }
}
