import React, {Component} from 'react';

export default class AutocompleteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {highlighted: false};

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleMouseEnter(e) {
        this.setState({highlighted: true});
    }

    handleMouseLeave(e) {
        this.setState({highlighted: false});
    }

    handleClick(e) {
        console.log(e);
        this.props.selectItem(this.props.details);
    }

    render() {
        const isHovered = this.state.highlighted ? "isHovered" : "";

        return (
            <div
                onMouseEnter={this.handleMouseEnter}
                onClick={this.handleClick}
                onMouseLeave={this.handleMouseLeave}
                className={`${isHovered} autocompleteItem`}
            >
                {this.props.details.name}
            </div>
        );
    }
}
