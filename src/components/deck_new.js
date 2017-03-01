import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { fetchCards } from '../actions/index';
import { Link } from 'react-router';
import axios from "axios";
import { connect } from 'react-redux';


class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputtedCard: '',
      searchSubmitted: false,
      activeCard: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Used for routing after submit
  static contextTypes = {
    router: PropTypes.object
  }

  renderResults() {
    var sortedCards = this.props.foundCards.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    if (sortedCards.length < 1 && this.state.searchSubmitted === true) {
      return(
        <span className="error">Sorry, no cards found with that name.</span>
      );
    }
    return sortedCards.map((card) => {
      if (card.imageUrl) {
        return(
          <li key={card.id}>
            <span onClick={this.setActiveCard(card)}><strong>{card.name}</strong> - {card.types[0]} / {card.cmc} CMC</span>
          </li>
        );
      }
    });
  }

  renderActiveCard() {
    var activeCard = this.state.activeCard;
    if (activeCard !== null) {
      return (
        <div className="new-deck-selected col-lg-3">
          <img src={activeCard.imageUrl} alt={activeCard.name} />
          <div className="new-deck-selected-details">
            <strong>{activeCard.name}</strong>
            <span>{activeCard.cmc}</span>
            <div>{activeCard.type}</div>
            <div>{activeCard.text}</div>
          </div>
        </div>
      );
    }
  }

  handleChange(event) {
    this.setState({inputtedCard: event.target.value});
    this.setState({searchSubmitted: false});
  }

  handleSubmit(event) {
    this.setState({inputtedCard: event.target.value});
    this.props.fetchCards(this.state.inputtedCard);
    this.setState({searchSubmitted: true});
    event.preventDefault();
  }

  setActiveCard(card){
      return function() {
          this.setState({activeCard: card});
      }.bind(this);
  }

  render() {
    return (
      <div className="container new-deck">
        <h2>Build a New Deck</h2>
          <div className="new-deck-search col-lg-5">
            <form onSubmit={this.handleSubmit}>
              <h4>Search Card Name</h4>
              <input type="text" value={this.state.inputtedCard} onChange={this.handleChange} />
              <button type="submit">Search</button>
            </form>
            <ul>
              {this.renderResults()}
            </ul>
          </div>

            {this.renderActiveCard()}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { foundCards: state.cards.foundCards };
}

export default connect(mapStateToProps, {fetchCards: fetchCards})(NewDeck);
