import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDecks, fetchDeck } from '../actions/index';
import { Link } from 'react-router';
import _ from 'lodash';
import SampleHand from './sample_hand';
import ColorChart from './color_chart';
import CmcChart from './cmc_chart';
import AnimateOnChange from 'react-animate-on-change';

class DeckDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: {
        imageUrl: './../../img/mtg-back.jpg',
        name: 'Select a card'
      },
      handShown: false
    }
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchDeck(this.props.params.id);
  }

  handleCardClick(card) {
    this.setState({activeCard: card});
  }

  renderCards(cardType) {
    let cardArray = [];
    if (cardType === "Sideboard") {
      cardArray = this.props.deck.sideboard;
    } else {
      let cards = this.props.deck.cards;
      cards.map(card => {
        if (cardType === "Instant") {
          if (card.types[0] === "Instant" || card.types[0] === "Sorcery") {
            cardArray.push(card);
          }
        } else if (card.types[0] === cardType) {
          cardArray.push(card);
        }
      })
    }
    var uniqueArray = _.map(
      _.uniq(
          _.map(cardArray, function(obj){
              return JSON.stringify(obj);
          })
      ), function(obj) {
          return JSON.parse(obj);
      }
    );
    if (uniqueArray.length > 0) {
      return uniqueArray.map((card) => {
        var cardCount = 0;

        for (var i = 0; i < cardArray.length; i++) {
          if(card.id == cardArray[i].id) {
            cardCount++;
          }
        }
        return(
          <span onClick={() => this.handleCardClick(card)} key={card.id + Math.floor(Math.random() * 999)}>
          {cardCount}x {card.name} <small>({card.set})</small><br />
          </span>
        );
      })
    } else {
      return (
        <span> None </span>
      );
    }
  }


  render() {
    if (this.props.deck) {
      const deck = this.props.deck;
      return (
        <div className="container deck_detail">

          <div className="row">
            <h2>{deck.name}</h2>
            <span className="deck_detail_format">{deck.format} deck</span>
            <br />
            <p className="deck_detail_description">{deck.description}</p>
          </div>

          <div className="row">

            <div className="col-sm-3">
              <div className="deck_detail_active_card">

                <AnimateOnChange
                  baseClassName="active-card"
                  animationClassName="active-card-animate"
                  animate={true}>

                  <img src={this.state.activeCard.imageUrl} alt={this.state.activeCard.name} />

                </AnimateOnChange>

              </div>

              <div className="deck_detail_colors">
                <div className="deck_detail_colors_header">
                  Colors
                </div>
                <div className="deck_detail_colors_body">
                  <ColorChart deck={deck} />
                </div>
              </div>

              <div className="deck_detail_cmc">
                <div className="deck_detail_cmc_header">
                  Converted Mana Cost
                </div>
                <div className="deck_detail_cmc_body">
                  <CmcChart deck={deck} />
                </div>
              </div>
            </div>


            <div className="col-sm-3">
              <div className="deck_detail_well">
                <div className="deck_detail_well_header">Creatures</div>
                <div className="deck_detail_well_body">
                {this.renderCards("Creature")}
                </div>
              </div>

              <div className="deck_detail_well">
                <div className="deck_detail_well_header">Instants/Sorceries</div>
                <div className="deck_detail_well_body">
                {this.renderCards("Instant")}
                </div>
              </div>
            </div>

            <div className="col-sm-3">
              <div className="deck_detail_well">
                <div className="deck_detail_well_header">Enchantments</div>
                <div className="deck_detail_well_body">
                {this.renderCards("Enchantment")}
                </div>
              </div>

              <div className="deck_detail_well">
                <div className="deck_detail_well_header">Artifacts</div>
                <div className="deck_detail_well_body">
                {this.renderCards("Artifact")}
                </div>
              </div>

              <div className="deck_detail_well">
                <div className="deck_detail_well_header">Planeswalkers</div>
                <div className="deck_detail_well_body">
                {this.renderCards("Planeswalker")}
                </div>
              </div>
            </div>

            <div className="col-sm-3">
              <div className="deck_detail_well">
                <div className="deck_detail_well_header">Lands</div>
                <div className="deck_detail_well_body">
                {this.renderCards("Land")}
                </div>
              </div>

              <div className="deck_detail_well">
                <div className="deck_detail_well_header">Sideboard</div>
                <div className="deck_detail_well_body">
                {this.renderCards("Sideboard")}
                </div>
              </div>
            </div>
          </div>
          <br />
          <SampleHand deck={this.props.deck}/>

        </div>
      );
    } else {
      return (
        <div>
        <h3 className="loading">loading deck...</h3>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { deck: state.decks.deck };
}

export default connect(mapStateToProps, { fetchDeck: fetchDeck })(DeckDetail);
