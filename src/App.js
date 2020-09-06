import React from 'react';
import logo from './logo.svg';
import './App.css';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      preface: props.msg ? props.msg : "Hello world, generic clock here.",
      time: props.time ? parseInt(props.time) : 1000
    };
  }
  componentDidMount() {
    this.timerID = setInterval( () => this.tick(), this.state.time);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render () {
    return (
      <div>
        <h1>{this.state.preface}</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  } 
}
class ButtonPractice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkMessageA: "Click here to go to google!",
      linkMessageB: "You fool. You've just activated my trap card. You are now banished to the SHADOW REALM!",
      A: true,
      dishonored: false
    };

  }
  deactivateTrapCard = () => {
    this.setState({A: true});
  }
  activateTrapCard = (e) => {
    e.preventDefault();
    console.log("HA! Someone clicked the button!");
    if (this.state.A !== false ) {
      setTimeout(this.deactivateTrapCard, 2000);
    }
    this.setState({A: false});
  }
  seppuku = () => {
    this.setState({dishonored: true});
  }
  render () {
    // eslint-disable-next-line
    let dishonored = !this.state.dishonored ? <Seppukuer onClick={this.seppuku}/> : <div/>;
    return (
      <div>
        <a
          href="https://www.google.com" 
          onClick={this.activateTrapCard}
          style={!this.state.A ? {color: "white"} : {color: "blue"}}
        >
        {this.state.A ? this.state.linkMessageA : this.state.linkMessageB}
       </a>
       <div>      
         {/* {dishonored} */}
      </div>
      </div>
      
    );
  }
}
function Seppukuer(props) {
  return (
    <button onClick={props.onClick}>Dishonor demands this.</button>
  )
}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  handleSubmit = (event) => {
    alert(`Name submitted: ${this.state.value}`);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.vlue} onChange={this.handleChange} />
        </label>
        <input type="button" onClick={this.handleSubmit} value="Scuffed_Submit"></input>
        <input type="submit" value="Submit here"></input>
      </form>
    );
  }
}
function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Clock msg=" " time="10000"/>
        <ButtonPractice />
        <NameForm />
      </header>
    </div>
  );
}

export default App;
