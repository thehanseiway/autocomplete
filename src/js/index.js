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
        this.state = {value: 'MD'};

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        console.log( event.target.value );
        const value  = event.target.value;
        
        this.setState({value});
    }

    render() {
        return (
            <div>
                <h1>Autocomplete:</h1>
                <label htmlFor="country">Choose your country</label>
                <Autocomplete
                    onInputChange={this.handleInputChange}
                    value={this.state.value}
                    //fetchData={}
                    //itemRender={}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
