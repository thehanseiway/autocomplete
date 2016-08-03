const style = require('../css/style.styl');

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from './components/Autocomplete';
import AutocompleteItem from './components/AutocompleteItem';

// Mock data
const data = [
  {abbr: "MD", name: "Moldova"},
  {abbr: "RU", name: "Russia"},
  {abbr: "RO", name: "Romania"},
  {abbr: "UA", name: "Ukraine"},
  {abbr: "FR", name: "France"},
  {abbr: "IT", name: "Italy"},
];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {data: []};
        this.getCountires = this.getCountires.bind(this);
    }

    // Get all countries from server
    getCountires() {
        fetch(this.props.url, {
            method: 'GET',
            cache: 'no-cache',
        })
        .then((res) => {
            if(res.ok) {
                res.json().then((data) => {
                    this.setState({data: data});
                });
            } else {
                console.log( `Response is with status: ${this.props.url}, ${res.statusText}` );
            }
        })
        .catch((error) => {
            console.log( `There is a problem with your fetch: ${error.message}` );
        });
    }

    componentDidMount() {
        this.getCountires();
    }

    render() {
        return (
            <div className="autocompleteContainer">
                <h1>Autocomplete:</h1>
                <label htmlFor="country">
                    Choose your country
                </label>
                <Autocomplete
                    id="country"
                    fetchData={this.state.data}
                    itemRender={(item) => <AutocompleteItem item={item}/>}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <App url="http://localhost:4000/api/countries"/>,
    document.getElementById('root')
);
