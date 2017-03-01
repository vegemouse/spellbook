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
      mainDeckArray: [],
      sideboardArray: [],
      deckName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
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
          <li key={card.id} onClick={this.setActiveCard(card)}>
            <strong>{card.name}</strong>
            <span className="pull-right">{card.types[0]} / {card.cmc} CMC</span>
          </li>
        );
      }
    });
  }

  renderActiveCard() {
    var activeCard = this.state.activeCard;
    if (activeCard !== null) {
      return (
        <div className="new-deck-selected">
          <img src={activeCard.imageUrl} alt={activeCard.name} />
          <div className="new-deck-selected-details">
            <strong>{activeCard.name}</strong>
            <span className="pull-right">{activeCard.cmc}</span>
            <div>{activeCard.type}</div>
            <div>{activeCard.text}</div>
            <button onClick={this.addCard(activeCard)}>+1</button>
            <button onClick={this.addFour(activeCard)}>+4</button>
            <button className="pull-right" onClick={this.addSideboard(activeCard)}>+SB</button>
          </div>
        </div>
      );
    }
  }

  renderDeck() {
    var sortedCards = this.state.mainDeckArray.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    return sortedCards.map((card) => {
      if (card.imageUrl) {
        return(
          <div>
            <li key={card.id}>
              <span onClick={this.setActiveCard(card)}><strong>{card.name}</strong> - {card.types[0]} / {card.cmc} CMC</span>
            </li>
          </div>
        );
      }
    });
  }

  renderSideboard() {
    var sortedCards = this.state.sideboardArray.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    return sortedCards.map((card) => {
      if (card.imageUrl) {
        return(
          <div>
            <li key={card.id}>
              <span onClick={this.setActiveCard(card)}><strong>{card.name}</strong> - {card.types[0]} / {card.cmc} CMC</span>
            </li>
          </div>
        );
      }
    });
  }

  addCard(card) {
    return function() {
      this.setState({mainDeckArray: this.state.mainDeckArray.concat([card])});
    }.bind(this);
  }

  addFour(card) {
    return function() {
      this.setState({mainDeckArray: this.state.mainDeckArray.concat([card], [card], [card], [card])});
    }.bind(this);
  }

  addSideboard(card) {
    return function() {
      this.setState({sideboardArray: this.state.sideboardArray.concat([card])});
    }.bind(this);
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

  handleNameChange(event) {
    this.setState({deckName: event.target.value});
  }

  render() {
    return (
      <div className="container new-deck">
        <h2>Build a New Deck</h2>
        <div>
          <label>Deck Name</label><input type="text" value={this.state.deckName} onChange={this.handleNameChange} />
        </div>

        <div className="new-deck-search col-md-5">
          <form onSubmit={this.handleSubmit}>
            <h4>Search Card Name</h4>
            <input type="text" value={this.state.inputtedCard} onChange={this.handleChange} />
            <button type="submit">Search</button>
          </form>
          <ul>
            {this.renderResults()}
          </ul>
        </div>

        <div className="col-md-3">
          {this.renderActiveCard()}
        </div>

        <div className="col-md-4">
          <strong>Deck Name</strong><span className="pull-right">{this.state.mainDeckArray.length} cards</span>
          <br />
          <strong>Main Deck</strong>
          {this.renderDeck()}
          <br />
          <strong>Sideboard</strong>
          {this.renderSideboard()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { foundCards: state.cards.foundCards };
}

export default connect(mapStateToProps, {fetchCards: fetchCards})(NewDeck);
