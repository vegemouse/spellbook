import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { fetchCards, createDeck, selectCard } from '../actions/index';
import { Link } from 'react-router';
import axios from "axios";
import { connect } from 'react-redux';
import CardSearch from './card_search';
import AnimateOnChange from 'react-animate-on-change';

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputtedCard: '',
      searchSubmitted: false,
      mainDeckArray: [],
      sideboardArray: [],
      maybeboardArray: [],
      deckName: '',
      deckCreator: '',
      deckFormat: '',
      deckDescription: '',
      error: null
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreatorChange = this.handleCreatorChange.bind(this);
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

  addMaybeboard(card) {
    return function() {
      this.setState({maybeboardArray: this.state.maybeboardArray.concat([card])});
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

  removeCardFromMaybeboard(card) {
    return function() {
      const maybeboard = this.state.maybeboardArray.slice();
      for(var i = maybeboard.length - 1; i>=0; i--) {
        if (maybeboard[i].id === card.id) {
          maybeboard.splice(i, 1);
        }
      }
      this.setState({maybeboardArray: maybeboard});
    }.bind(this);
  }

  getColors(deck) {
    var colorsArray = [];
    deck.map((card) => {
      if (card.colorIdentity) {
        card.colorIdentity.map((color) => {
          colorsArray.push(color);
        });
      }
    });

    var colors = colorsArray.filter(function(elem, pos) {
      return colorsArray.indexOf(elem) == pos;
    });

    return colors;
  }

  checkError() {
    if (this.state.error === 'name') {
      return <div className="row error">*Please give your deck a name</div>;
    }
    if (this.state.error === 'format') {
      return <div className="row error">*Please give your deck a format</div>;
    }
    if (this.state.error === 'cards') {
      return <div className="row error">*Please give your deck some cards</div>;
    }
  }

  saveDeck() {

    return function() {

      if (!this.state.deckName) {
        this.setState({error: 'name'});
        window.scrollTo(0, 0);
      } else if (!this.state.deckFormat) {
        this.setState({error: 'format'});
        window.scrollTo(0, 0);
      } else if (!this.state.mainDeckArray.length > 0) {
        this.setState({error: 'cards'});
        window.scrollTo(0, 0);
      } else {
        let now = new Date();
        const deck = {
          name: this.state.deckName,
          creator: this.state.deckCreator,
          format: this.state.deckFormat,
          description: this.state.deckDescription,
          cards: this.state.mainDeckArray,
          sideboard: this.state.sideboardArray,
          maybeboard: this.state.maybeboardArray,
          colors: this.getColors(this.state.mainDeckArray)
        }
        this.props.createDeck(deck).then(() => {
          this.context.router.push('/decks');
        });
      }
    }.bind(this)
  }

  handleNameChange(event) {
    this.setState({deckName: event.target.value});
  }

  handleCreatorChange(event) {
    this.setState({deckCreator: event.target.value});
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
            <span key={card.id + Math.floor(Math.random() * 999)}>
              <span onClick={() => this.handleCardClick(card)}><strong>{card.name}</strong></span><button onClick={this.removeCard(card)}><i className="fa fa-minus" aria-hidden="true"></i></button>
            </span>
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
            <span key={card.id}>
              <span key={card.id + Math.floor(Math.random() * 999)} onClick={() => this.handleCardClick(card)}><strong>{card.name}</strong></span><button onClick={this.removeCardFromSideboard(card)}><i className="fa fa-minus" aria-hidden="true"></i></button>
            </span>
          </div>
        );
      }
    });
  }

  renderMaybeboard() {
    var sortedCards = this.state.maybeboardArray.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    return sortedCards.map((card) => {
      if (card.imageUrl) {
        return(
          <div>
            <span key={card.id}>
              <span key={card.id + Math.floor(Math.random() * 999)} onClick={() => this.handleCardClick(card)}><strong>{card.name}</strong></span><button onClick={this.removeCardFromMaybeboard(card)}><i className="fa fa-minus" aria-hidden="true"></i></button>
            </span>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div className="container deck">
        <h2>Build a New Deck</h2>
        {this.checkError()}
        <div className="deck_inputs row">
          <div className="deck_inputs_group"><label>Deck Name</label><input type="text" value={this.state.deckName} onChange={this.handleNameChange} /></div>
          <div className="deck_inputs_group"><label>Created by</label><input type="text" value={this.state.deckCreator} onChange={this.handleCreatorChange} /></div>
          <div className="deck_inputs_group"><label>Deck Format</label>
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

          <AnimateOnChange
            baseClassName="active-card"
            animationClassName="active-card-animate"
            animate={true}
          >
            <div className="col-sm-4 selected_card">
              {!this.props.selectedCard &&
                <h5>To begin, please search for a card.</h5>
              }
              {this.props.selectedCard &&
                <div>
                  <div className="selected_card_image"><img src={this.props.selectedCard.imageUrl} alt={this.props.selectedCard.name} /></div>
                  <div className="selected_card_details">
                    <div className="selected_card_details_head"><strong>{this.props.selectedCard.name}</strong>
                    <span className="pull-right cmc">{this.props.selectedCard.cmc}</span></div>
                    <div className="selected_card_details_type">{this.props.selectedCard.type}</div>
                    <div className="selected_card_details_text">{this.props.selectedCard.text}</div>
                    <div className="selected_card_buttons">
                      <button onClick={this.addCard(this.props.selectedCard)}>+1</button>
                      <button onClick={this.addFour(this.props.selectedCard)}>+4</button>
                      <button className="pull-right" onClick={this.addMaybeboard(this.props.selectedCard)}>+?</button>
                      <button className="pull-right" onClick={this.addSideboard(this.props.selectedCard)}>+SB</button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </AnimateOnChange>

          <div className="col-sm-4 deck_output">
            <div className="deck_output_header"><h5>{this.state.deckName}</h5><label>{this.state.mainDeckArray.length} cards</label></div>
            <br />
            <div className="deck_output_cards">
              <h5>Main Deck</h5>
              {this.renderDeck()}
              <br />
              <h5>Sideboard</h5>
              {this.renderSideboard()}
              <br />
              <h5>Maybeboard</h5>
              {this.renderMaybeboard()}
            </div>
          </div>
        </div>

        <div className="deck_bottom">
          <label>Description</label><textarea value={this.state.deckDescription} onChange={this.handleDescriptionChange} />

          <div className="deck_bottom_buttons">
            <span className="save_button" onClick={this.saveDeck()}>Save Deck</span>
            <Link to="/" className="cancel_button">Cancel</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selectedCard: state.cards.selectedCard};
}

export default connect(mapStateToProps, {fetchCards: fetchCards, createDeck: createDeck, selectCard: selectCard})(NewDeck);
