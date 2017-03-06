import React, { Component } from 'react';

export default class Deck extends Component {
  render() {
    return(
      <div>
        <h3>{this.props.deck.name}</h3>
        <span>{this.props.deck.format} deck</span>
      </div>
    );
  }
}
