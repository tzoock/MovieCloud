import React from 'react';


export default class Greeting extends React.Component {
  constructor(props) {
    super();

    this.state = {
      counter: 0,
      isVisible: true
    };

    this.clickButton = this.clickButton.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  clickButton() {

    const count = this.state.counter;
    this.setState({counter: count + 1})
  }

  toggleVisible() {
    let vis = !this.state.isVisible;
    this.setState({isVisible: vis});
  }


  render() {

    let count = this.state.isVisible === true ? <h3>Counter: {this.state.counter}</h3> : null;

    return (
      <div>
        <h1>Song-Cloud</h1>
        {count}
        <h2>my name is {this.props.data.what}
          <br/> my name is {this.props.data.who}
          <br/>my name is {this.props.data.what}
          <br/>{this.props.data.name}
        </h2>
        <button onClick={() => this.clickButton()}>Click Me</button>
        <button onClick={() => this.toggleVisible()}>show/hide Counter</button>
      </div>)
  };
}

// Update the Greeting component to be a `class` with a state Object that has a `counter` property
// Show the counter value as a heading e.g. “Counter: 0”
// Update the button to increment the counter
