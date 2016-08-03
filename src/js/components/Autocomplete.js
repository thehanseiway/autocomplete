import React, {Component} from 'react';
import AutocompleteItemList from './AutocompleteItemList';

export default class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', isOpen: false, items: this.props.fetchData};

        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.renderList = this.renderList.bind(this);
        this.filterItems = this.filterItems.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleChange(event) {

        this.setState({value: event.target.value});
        this.filterItems();

    }

    filterItems() {

        const value = this.state.value.trim();

        if(!value) {
            this.setState({items: this.props.fetchData});
            return;
        }

        const filteredItems = this.props.fetchData.filter(function filterItems(item, index) {
            const itemName = item.name.toLowerCase();
            const value = this.state.value.toLowerCase();

            return itemName.indexOf(value) >= 0;
        }.bind(this));

        this.setState({items: filteredItems});
    }

    handleFocus(event) {
        this.setState({isOpen: true});
    }

    handleBlur(event) {
        this.setState({isOpen: false});
    }

    handleSelect(value) {
        console.log(value);
        this.setState({value: 'test'});
    }

    renderList() {
        if (this.state.isOpen) {
            return (
                <AutocompleteItemList items={this.state.items} handleSelect={this.handleSelect}/>
            );
        }
    }

    render() {
        return (
            <div className="autoComplete">
                <input type="text"
                    onKeyUp={this.filterItems}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    //onBlur={this.handleBlur}
                    value={this.state.value}
                />

                {this.renderList()}
            </div>
        );
    }
}
