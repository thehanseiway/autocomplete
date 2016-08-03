import React, {Component} from 'react';
import AutocompleteItemList from './AutocompleteItemList';

export default class Autocomplete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            isOpen: false,
            items: this.props.fetchData,
            ignoreBlur: false,
            highlightedIndex: null,
        };

        this.keyDownHandlers = {
            ArrowDown (event) {
                event.preventDefault();
                const itemsLength = this.state.items.length;

                if (!this.state.items.length) {
                    return;
                }
                const { highlightedIndex } = this.state;
                const index = (
                    highlightedIndex === null ||
                    highlightedIndex === itemsLength - 1
                ) ? 0 : highlightedIndex + 1;

                this.setState({
                    highlightedIndex: index,
                    isOpen: true,
                });
            },
            ArrowUp (event) {
                event.preventDefault();
                event.preventDefault();
                const itemsLength = this.state.items.length;

                if (!this.state.items.length) {
                    return;
                }
                const { highlightedIndex } = this.state;
                const index = (
                    highlightedIndex === null ||
                    highlightedIndex === 0
                ) ? itemsLength - 1 : highlightedIndex - 1;

                this.setState({
                    highlightedIndex: index,
                    isOpen: true,
                });
            },
            Enter (event) {
                event.preventDefault();
                const itemsLength = this.state.items.length;
                const {items, highlightedIndex} = this.state;
                const value = items[highlightedIndex].name;

                if (!this.state.items.length) {
                    return;
                }

                this.setState({
                    isOpen: false,
                    value,
                });
            },
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.renderList = this.renderList.bind(this);
        this.filterItems = this.filterItems.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.setIgnoreBlur = this.setIgnoreBlur.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.filterItems();
    }

    filterItems() {
        const props = this.props;
        let {value} = this.state;
        value = value.trim().toLowerCase();

        // if no value found set items old data
        // and return from function
        if(!value) {
            this.setState({items: this.props.fetchData});
            return;
        }

        // Find the matching items
        const filteredItems = props.fetchData.filter(function filterItems(item, index) {
            const itemName = item.name.toLowerCase();

            // Filter by value in item name
            return itemName.indexOf(value) >= 0 && itemName !== value;
        }.bind(this));

        this.setState({items: filteredItems});
    }

    handleKeyUp(event) {
        this.filterItems()
        this.setIgnoreBlur(false);
    }

    handleFocus(event) {
        this.setState({
            isOpen: true,
        });

        this.filterItems();
    }

    handleBlur(event) {
        if(this._ignoreBlur) {
            this.setState({isOpen: false});
        }
    }

    setIgnoreBlur(ignore) {
        this._ignoreBlur = ignore;
    }

    handleSelect(value) {
        this.setState({
            value: value.name,
            isOpen: false,
        });
    }

    handleMouseEnter(event) {
        this.setIgnoreBlur(false);
    }

    handleMouseLeave(event) {
        this.setIgnoreBlur(true);
    }

    handleKeyDown(event) {
        this.filterItems();

        if(this.keyDownHandlers[event.key]) {
            this.keyDownHandlers[event.key].call(this, event);
            this.setIgnoreBlur(true);
        } else {
            this.setState({
                isOpen: true,
            });
        }
    }

    renderList() {
        if (this.state.isOpen && !this._ignoreBlur && this.state.items.length ) {
            return (
                <AutocompleteItemList
                    items={this.state.items}
                    handleSelect={this.handleSelect}
                    setIgnore={this.setIgnoreBlur}
                    itemRender={this.props.itemRender}
                    highlightedItem={this.state.highlightedIndex}
                />
            );
        }
    }

     componentWillMount () {
        this._ignoreBlur = false;
     }

    render() {
        return (
            <div
                className="autocomplete"
                onMouseLeave={this.handleMouseLeave}
                onMouseEnter={this.handleMouseEnter}
            >
                <input
                    autoComplete="off"
                    type="text"
                    id={this.props.id}
                    onKeyDown={this.handleKeyDown}
                    onKeyUp={this.handleKeyUp}
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
