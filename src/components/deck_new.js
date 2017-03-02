import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { fetchCards, createDeck } from '../actions/index';
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
      deckFormat: '',
      deckDescription: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
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

  removeCard(card) {
    return function() {
      const mainDeck = this.state.mainDeckArray.slice();
      for(var i = mainDeck.length - 1; i>=0; i--) {
        if (mainDeck[i].id === card.id) {
          mainDeck.splice(i, 1);
        }
      }
      this.setState({mainDeckArray: mainDeck});
    }.bind(this);
  }

  removeCardFromSideboard(card) {
    return function() {
      const sideboard = this.state.sideboardArray.slice();
      for(var i = sideboard.length - 1; i>=0; i--) {
        if (sideboard[i].id === card.id) {
          sideboard.splice(i, 1);
        }
      }
      this.setState({sideboardArray: sideboard});
    }.bind(this);
  }

  saveDeck() {
    return function() {
      const deck = {
        name: this.state.deckName,
        format: this.state.deckFormat,
        description: this.state.deckDescription,
        cards: this.state.mainDeckArray,
        sideboard: this.state.sideboardArray
      }
      this.props.createDeck(deck);
    }.bind(this);
  }

  handleSearchChange(event) {
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

  handleFormatChange(event) {
    this.setState({deckFormat: event.target.value});
  }

  handleDescriptionChange(event) {
    this.setState({deckDescription: event.target.value});
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
              <span onClick={this.setActiveCard(card)}><strong>{card.name}</strong> - {card.types[0]} / {card.cmc} CMC</span><button onClick={this.removeCard(card)}>-</button>
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
              <span onClick={this.setActiveCard(card)}><strong>{card.name}</strong> - {card.types[0]} / {card.cmc} CMC</span><button onClick={this.removeCardFromSideboard(card)}>-</button>
            </li>
          </div>
        );
      }
    });
  }


  // Main Render Function
  render() {
    return (
      <div className="container new-deck">
        <h2>Build a New Deck</h2>
        <div>
          <label>Deck Name</label><input type="text" value={this.state.deckName} onChange={this.handleNameChange} />
          <label>Format</label>
          <select value={this.state.deckFormat} onChange={this.handleFormatChange}>
            <option value="">Select a Format</option>
            <option value="Standard">Standard</option>
            <option value="Modern">Modern</option>
            <option value="Legacy">Legacy</option>
            <option value="Vintage">Vintage</option>
            <option value="EDH/Commander">EDH/Commander</option>
            <option value="Pauper">Pauper</option>
            <option value="Peasant">Peasant</option>
            <option value="Archenemy">Archenemy</option>
            <option value="Vanguard">Vanguard</option>
            <option value="Planechase">Planechase</option>
          </select>
        </div>

        <div className="row">
          <div className="new-deck-search col-md-5">
            <form onSubmit={this.handleSubmit}>
              <h4>Search Card Name</h4>
              <input type="text" value={this.state.inputtedCard} onChange={this.handleSearchChange} />
              <button type="submit">Search</button>
            </form>
            <ul>
              {this.renderResults()}
            </ul>
          </div>

          <div className="col-md-3">
            {this.state.activeCard &&
              <div className="new-deck-selected">
                <img src={this.state.activeCard.imageUrl} alt={this.state.activeCard.name} />
                <div className="new-deck-selected-details">
                  <strong>{this.state.activeCard.name}</strong>
                  <span className="pull-right">{this.state.activeCard.cmc}</span>
                  <div>{this.state.activeCard.type}</div>
                  <div>{this.state.activeCard.text}</div>
                  <button onClick={this.addCard(this.state.activeCard)}>+1</button>
                  <button onClick={this.addFour(this.state.activeCard)}>+4</button>
                  <button className="pull-right" onClick={this.addSideboard(this.state.activeCard)}>+SB</button>
                </div>
              </div>
            }
          </div>

          <div className="col-md-4">
            <strong>{this.state.deckName}</strong><span className="pull-right">{this.state.mainDeckArray.length} cards</span>
            <br />
            <strong>Main Deck</strong>
            {this.renderDeck()}
            <br />
            <strong>Sideboard</strong>
            {this.renderSideboard()}
          </div>
        </div>

        <label>Description</label><textarea value={this.state.deckDescription} onChange={this.handleDescriptionChange} />
        <button onClick={this.saveDeck()} className="pull-right">Save</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { foundCards: state.cards.foundCards };
}

export default connect(mapStateToProps, {fetchCards: fetchCards, createDeck: createDeck})(NewDeck);
