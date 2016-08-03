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

    highlightItem() {
        const items = this.props.items;
        const {highlightedIndex} = this.state;
        const element = document.getElementById(`item-${highlightedIndex}`);

        if(items[highlightedIndex]) {
            element.style.backgroundColor = '#eeeeee';
        } else {
            element.style.backgroundColor = 'transparent';
        }
    }

    handleClick(e) {
        const id = e.currentTarget.id;
        const index = id.substring(id.indexOf('-') + 1);
        const item = this.props.items[index];

        this.props.handleSelect(item);
    }

    handleMouseEnter(e) {
        const id = e.currentTarget.id;
        const index = id.substring(id.indexOf('-') + 1);
        const item = this.props.items[index];
        const element = document.getElementById(id);
        this._lastItem = element;

        element.style.backgroundColor = '#eeeeee';
    }

    handleMouseLeave(e) {
        const element = this._lastItem;
        element.style.backgroundColor = 'transparent';
    }

    componentDidMount() {
        if(this.state.highlightedIndex !== null) {
            this.highlightItem();
        }
    }

    render() {
        const props = this.props;

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
