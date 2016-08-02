const style = require('../css/style.styl');

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from './components/Autocomplete';

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
    }

    render() {
        return (
            <div>
                <h1>Autocomplete:</h1>
                <label htmlFor="country">Choose your country</label>
                <Autocomplete
                    fetchData={data}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
