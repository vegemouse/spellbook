import React, { Component } from 'react';

export default class SampleHand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsInHand: 7
    }
  }

  handleMulliganClick() {
    if (this.state.cardsInHand === 1) {
      this.setState({cardsInHand: 7})
    } else {
      this.setState({cardsInHand: this.state.cardsInHand - 1})
    }
  }

  renderHand() {
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    var shuffledDeck = shuffle([ ...this.props.deck.cards ]);

    return shuffledDeck.slice(0, this.state.cardsInHand).map((card) => {
      return <img alt={card.name} key={card.id + Math.floor(Math.random() * 999)} src={card.imageUrl} />
    })
  }

  render() {
    return(
      <div className="hand_container">
        <h2>Sample Hand</h2>
        <button className="hand_button" onClick={() => this.handleMulliganClick()}> Mulligan</button>
        <div className="sample_hand">
          {this.renderHand()}
        </div>
      </div>
    );
  }
}
