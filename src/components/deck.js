import React, { Component } from 'react';
import { Link } from 'react-router';
import AnimateOnChange from 'react-animate-on-change';

export default class Deck extends Component {

  renderColors() {
    if (this.props.deck.colors) {
      return this.props.deck.colors.map((color) => {
        if (color === "U") {
          color = "#587dbc";
        } else if (color === "R") {
          color = "#b25252";
        } else if (color === "G") {
          color = "#79af7d";
        } else if (color === "B") {
          color = "#010b1c";
        } else if (color === "W") {
          color = "#f4f4e3";
        }
        const colorStyle = {
          backgroundColor: color,
        }
        return (
          <div key={color} className="color" style={colorStyle}></div>
        );
      });
    }
  }

  renderDeckBottom() {
    const cards = this.props.deck.cards;
    const randomCard = cards[Math.floor(Math.random() * cards.length)];

    const cardStyle = {
      backgroundImage: `url(${randomCard.imageUrl})`,
    }

    return(
      <div className="deck_item_bottom" style={cardStyle}>
        <p>
        {this.props.deck.description.slice(0, 180)}...<br /><strong>(Read more)</strong>
        </p>
      </div>
    );
  }

  render() {
    return (
      <AnimateOnChange
        baseClassName="deck"
        animationClassName="deck-animate"
        animate={true}
      >
        <div className="deck_item">
          <div className="deck_item_head">
            <div><h3>{this.props.deck.name}</h3>
            <span className="deck_item_format">{this.props.deck.format} deck</span></div>
            <div className="deck_item_colors">
              {this.renderColors()}
            </div>
          </div>
          {this.renderDeckBottom()}
        </div>
      </AnimateOnChange>
    );
  }
}
