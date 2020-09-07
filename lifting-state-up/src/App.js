import React from 'react';
import logo from './logo.svg';
import './App.css';

function BoilingVerdict(props) {
  return <p>The water  {props.celsius ? `would ${(props.celsius < 100 ? 'not' : '')} boil` : 'does not exist'}</p>
}


const scaleNames = {
  c: 'Celsius',
  f: 'Farenheit'
}
class TemperatureInput extends React.Component {
  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  }
  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <div>
        </div>
      </fieldset>
    )
  }
}
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: ''};
  }
  handleCelsiusChange = (temperature) => {
    this.setState({celsius: temperature, fahrenheit: tryConvert(temperature, toFahrenheit)});
  }
  handleFarenheitChange = (temperature) => {
    this.setState({fahrenheit: temperature, celsius: tryConvert(temperature, toCelsius)});
  }

  render() {
    return (
      <div>
        <TemperatureInput 
        scale='c'
        temperature={this.state.celsius}
        onTemperatureChange={this.handleCelsiusChange}/>
        <TemperatureInput 
        scale='f' 
        temperature={this.state.fahrenheit}
        onTemperatureChange={this.handleFarenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(this.state.celsius)}/>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Calculator />
      </header>
    </div>
  );
}

export default App;
