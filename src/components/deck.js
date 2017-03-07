import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Deck extends Component {

  renderColors() {
    if (this.props.deck.colors) {
      return this.props.deck.colors.map((color) => {
        if (color === "U") {
          color = "blue";
        } else if (color === "R") {
          color = "red";
        } else if (color === "G") {
          color = "green";
        } else if (color === "B") {
          color = "black";
        } else if (color === "W") {
          color = "white";
        }
        const colorStyle = {
          backgroundColor: color,
        }
        return (
          <div className="color" style={colorStyle}></div>
        );
      });
    }
  }

  renderCard() {
    const cards = this.props.deck.cards;
    const randomCard = cards[Math.floor(Math.random() * cards.length)];

    const cardStyle = {
      backgroundImage: `url(${randomCard.imageUrl})`,
    }

    return <div className="deck_item_card" style={cardStyle} />
  }

  render() {
    return (
      <div className="deck_item">
        <div className="deck_item_head">
          <div><h3>{this.props.deck.name}</h3>
          <span className="deck_item_format">{this.props.deck.format} deck</span></div>
          <div className="deck_item_colors">
            {this.renderColors()}
          </div>
        </div>
        <div className="deck_item_bottom">
          {this.renderCard()}
          <p>
          <strong>{this.props.deck.cards.length} cards</strong><br />
          {this.props.deck.description.slice(0, 170)}... <Link><strong>More Info</strong></Link>
          </p>
        </div>

      </div>
    );
  }
}
