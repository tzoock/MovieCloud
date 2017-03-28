import React from 'react';


export default class Greeting extends React.Component {
  constructor(props) {
    super();

    this.state = {
      counter: 0,
      isVisible: true,
      assassions: [
        {
          name: 'captain Hook',
          kills: '0'
        },
        {
          name: 'professor octopus',
          kills: '0'
        },
        {
          name: 'chi chi',
          kills: '0'
        }
      ]
    };

    this.clickButton = this.clickButton.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }


  clickButton() {
    const count = this.state.counter;
    this.setState({counter: count + 1});
    this.handleKills();
  }

  toggleVisible() {
    let vis = !this.state.isVisible;
    this.setState({isVisible: vis});
  }

  handleKills() {
    const assassions = this.state.assassions.map((killer, i) => {
      return Object.assign({}, killer, {kills: this.state.counter + 1});
    });
    this.setState({assassions});
  }

  createPeople() {
    return this.state.assassions.map((person) => {

      return (
        <li key={person.name}>
          name:{ person.name} kills:{person.kills}
        </li>

      )
    })
  }


  render() {

    let count = this.state.isVisible === true ? <h3>Counter: {this.state.counter}</h3> : null;

    return (
      <div>
        <h1>Song-Cloud</h1>
        {count}
        <h2>my name is {this.props.data.name}
          <br/>and my age is {this.props.data.age}
        </h2>
        <button onClick={() => this.clickButton()}>add kills</button>
        <button onClick={() => this.toggleVisible()}>show/hide Counter</button>
        <ul>
          {this.createPeople()}
        </ul>
      </div>)
  };
}

