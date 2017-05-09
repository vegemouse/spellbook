import React, { Component } from 'react';

export default class CmcChart extends Component {
  render() {
    
    let cards = this.props.deck.cards;
    let zero = 0;
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    let moreThanSix = 0;

    cards.map((card, key) => {
      if (!card.cmc) {
        zero++;
      } else if (card.cmc === 1) {
        one++;
      } else if (card.cmc === 2) {
        two++;
      } else if (card.cmc === 3) {
        three++;
      } else if (card.cmc === 4) {
        four++;
      } else if (card.cmc === 5) {
        five++;
      } else if (card.cmc === 6) {
        six++;
      } else if (card.cmc > 6) {
        moreThanSix++;
      }
    });

    return(
      <div className="cmc_inner">
        <div className="cmc_inner_left">
          <strong>0:</strong> {zero} cards<br />
          <strong>1:</strong> {one} cards<br />
          <strong>2:</strong> {two} cards<br />
          <strong>3:</strong> {three} cards<br />
        </div>
        <div className="cmc_inner_right">
          <strong>4:</strong> {four} cards<br />
          <strong>5:</strong> {five} cards<br />
          <strong>6:</strong> {six} cards<br />
          <strong>>:</strong> {moreThanSix} cards<br />
        </div>
      </div>
    )
  }
}
