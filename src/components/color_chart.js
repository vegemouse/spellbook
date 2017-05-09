import React, { Component } from 'react';
import PieChart from 'react-simple-pie-chart';

export default class ColorChart extends Component {
  render() {
    let cards = this.props.deck.cards;
    let red = 0;
    let blue = 0;
    let green = 0;
    let white = 0;
    let black = 0;

    cards.map((card, key) => {
      if (card.colorIdentity) {
        card.colorIdentity.map((color => {
          if (color === "R") {
            red++;
          } else if (color === "U") {
            blue++;
          } else if (color === "G") {
            green++;
          } else if (color === "W") {
            white++;
          } else if (color === "B") {
            black++;
          }
        }));
      }
    });
    return (
      <PieChart
      slices={[
        {
          color: '#b25252',
          value: red,
        },
        {
          color: '#79af7d',
          value: green,
        },
        {
          color: '#587dbc',
          value: blue,
        },
        {
          color: '#f4f4e3',
          value: white,
        },
        {
          color: '#010b1c',
          value: black,
        },
      ]}
      />
    )
  }
}
