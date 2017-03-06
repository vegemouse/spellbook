import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { fetchCards, createDeck, selectCard } from '../actions/index';
import { Link } from 'react-router';
import axios from "axios";
import { connect } from 'react-redux';
import CardSearch from './card_search';


class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputtedCard: '',
      searchSubmitted: false,
      mainDeckArray: [],
      sideboardArray: [],
      deckName: '',
      deckFormat: '',
      deckDescription: '',
      error: false
    };

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

  getColors(deck) {
    var colorsArray = [];
    deck.map((card) => {
      card.colors.map((color) => {
        colorsArray.push(color);
      });
    });
    return colorsArray;
  }

  checkError() {
    if (this.state.error) {
      return <div className="row error">Please ensure all fields are filled out.</div>;
    }
  }

  saveDeck() {
    return function() {
      if(this.state.deckName && this.state.deckFormat && this.state.deckDescription && this.state.mainDeckArray.length > 0) {
        const deck = {
          name: this.state.deckName,
          format: this.state.deckFormat,
          description: this.state.deckDescription,
          cards: this.state.mainDeckArray,
          sideboard: this.state.sideboardArray,
          colors: this.getColors(this.state.mainDeckArray)
        }
        this.props.createDeck(deck).then(() => {
      this.context.router.push('/');
    });
      } else {
        this.setState({error: true})
      }
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

  handleCardClick(card) {
    this.props.selectCard(card);
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
              <span onClick={() => this.handleCardClick(card)}><strong>{card.name}</strong> - {card.types[0]} / {card.cmc} CMC</span><button onClick={this.removeCard(card)}>-</button>
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
              <strong>{card.name}</strong> - {card.types[0]} / {card.cmc} CMC<button onClick={this.removeCardFromSideboard(card)}>-</button>
            </li>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div className="container new-deck">
        <h2>Build a New Deck</h2>
        {this.checkError()}
        <div className="deck_inputs row">
          <div className="deck_inputs_group"><label>Deck Name</label><input type="text" value={this.state.deckName} onChange={this.handleNameChange} /></div>
          <div className="deck_inputs_group"><label>Format</label>
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
        </div>

        <div className="row">

          <CardSearch />

          <div className="col-md-3">
            {this.props.selectedCard &&
              <div className="new-deck-selected">
                <img src={this.props.selectedCard.imageUrl} alt={this.props.selectedCard.name} />
                <div className="new-deck-selected-details">
                  <strong>{this.props.selectedCard.name}</strong>
                  <span className="pull-right">{this.props.selectedCard.cmc}</span>
                  <div>{this.props.selectedCard.type}</div>
                  <div>{this.props.selectedCard.text}</div>
                  <button onClick={this.addCard(this.props.selectedCard)}>+1</button>
                  <button onClick={this.addFour(this.props.selectedCard)}>+4</button>
                  <button className="pull-right" onClick={this.addSideboard(this.props.selectedCard)}>+SB</button>
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

        <div className="pull-right">
          <Link to="/" className="btn">Cancel</Link>
          <button className="btn" onClick={this.saveDeck()}>Save</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selectedCard: state.cards.selectedCard};
}

export default connect(mapStateToProps, {fetchCards: fetchCards, createDeck: createDeck, selectCard: selectCard})(NewDeck);
