import React, {Component} from 'react';

export default class AutocompleteItemList extends Component {
    constructor(props) {
        super(props);
        this._lastItem = null;

        this.state = {highlightedIndex: this.props.highlightedItem};
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.highlightItem = this.highlightItem.bind(this);
    }
    
    // Helpers
    highlightIndexItem() {
        const items = this.props.items;
        const {highlightedIndex} = this.state;
        const element = document.getElementById(`item-${highlightedIndex}`);

        this.highlightItem(element, items[highlightedIndex]);
    }

    highlightItem(elem, highlight) {
        if(elem !== null) {
            if(highlight) {
                return elem.style.backgroundColor = '#eeeeee';
            }

            return elem.style.backgroundColor = 'transparent';
        }
    }

    getItem(e) {
        const id = e.currentTarget.id;
        const index = id.substring(id.indexOf('-') + 1);
        const item = this.props.items[index];

        return {
            item,
            id,
        }
    }

    // Mouse events
    handleClick(e) {
        const {item} = this.getItem(e);

        this.props.handleSelect(item);
    }

    handleMouseEnter(e) {
        const {id, item} = this.getItem(e);
        const element = document.getElementById(id);
        this._lastItem = element;

        this.highlightItem(element, true);
    }

    handleMouseLeave(e) {
        const element = this._lastItem;

        this.highlightItem(element, false);
    }

    // Component methods
    componentDidMount() {
        if(this.state.highlightedIndex !== null) {
            this.highlightIndexItem();
        }
    }

    render() {
        const props = this.props;

        // Item nodes
        const items = props.items.map(function items(item, index) {
            return (
                <li
                    className={`autocompleteItem`}
                    key={item.abbr} id={`item-${index}`}
                    onClick={this.handleClick}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                >
                    {this.props.itemRender(item, index)}
                </li>
            );
        }.bind(this));

        return (
            <ul className="autocompleteItemList">
                {items}
            </ul>
        );
    }
}
