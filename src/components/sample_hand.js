import React, { Component } from 'react';

export default class SampleHand extends Component {

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

    var deck = this.props.deck.cards;
    var shuffledDeck = shuffle(deck);

    return shuffledDeck.slice(0, 7).map((card) => {
      return <img alt={card.name} key={card.id} src={card.imageUrl} />
    })
  }

  render() {
    return(
      <div className="sample_hand">
      {this.renderHand()}
      </div>
    );
  }
}
