import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDecks, fetchDeck } from '../actions/index';
import { Link } from 'react-router';
import PieChart from 'react-simple-pie-chart';
import _ from 'lodash';
import SampleHand from './sample_hand';

class DeckDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: {},
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

  handleHandClick() {
    if (!this.state.handShown) {
      this.setState({handShown: true});
    } else {
      this.setState({handShown: false})
    }
  }

  renderColors() {
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
          color: 'red',
          value: red,
        },
        {
          color: 'green',
          value: green,
        },
        {
          color: 'blue',
          value: blue,
        },
        {
          color: 'white',
          value: white,
        },
        {
          color: 'black',
          value: black,
        },
      ]}
      />
    )
  }

  renderCmc() {
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
      if (card.cmc === 0) {
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

    return (
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

  renderCreatures() {
    let cards = this.props.deck.cards;
    let creaturesArray = [];
    cards.map(card => {
      if (card.types[0] === "Creature" || card.types[1] === "Creature") {
        creaturesArray.push(card);
      }
    })
    // Remove duplicates from Array
    var uniqueArray = _.map(
      _.uniq(
          _.map(creaturesArray, function(obj){
              return JSON.stringify(obj);
          })
      ), function(obj) {
          return JSON.parse(obj);
      }
    );
    // Count amount in Array...
    if (uniqueArray.length > 0) {
      return uniqueArray.map((card) => {
        var cardCount = 0;

        for (var i = 0; i < creaturesArray.length; i++) {
          if(card.id == creaturesArray[i].id) {
            cardCount++;
          }
        }

        return(
          <span onClick={() => this.handleCardClick(card)} key={card.id + Math.floor(Math.random() * 999)}>
          {cardCount}x {card.name}<br />
          </span>
        );
      })
    } else {
      return (
        <span> None </span>
      )
    }
  }

  renderLands() {
    let cards = this.props.deck.cards;
    let landsArray = [];
    cards.map(card => {
      if (card.types[0] === "Land") {
        landsArray.push(card);
      }
    })

    // Remove duplicates from Array
    var uniqueArray = _.map(
      _.uniq(
          _.map(landsArray, function(obj){
              return JSON.stringify(obj);
          })
      ), function(obj) {
          return JSON.parse(obj);
      }
    );


    if (uniqueArray.length > 0) {
      return uniqueArray.map((card) => {
        var cardCount = 0;

        for (var i = 0; i < landsArray.length; i++) {
          if(card.id == landsArray[i].id) {
            cardCount++;
          }
        }

        return(
          <span onClick={() => this.handleCardClick(card)} key={card.id + Math.floor(Math.random() * 999)}>
          {cardCount}x {card.name}<br />
          </span>
        );
      })
    } else {
      return (
        <span> None </span>
      )
    }
  }

  renderInstants() {
    let cards = this.props.deck.cards;
    let instantsArray = [];
    cards.map(card => {
      if (card.types[0] === "Sorcery" || card.types[0] === "Instant" ) {
        instantsArray.push(card);
      }
    })

    // Remove duplicates from Array
    var uniqueArray = _.map(
      _.uniq(
          _.map(instantsArray, function(obj){
              return JSON.stringify(obj);
          })
      ), function(obj) {
          return JSON.parse(obj);
      }
    );

    if (uniqueArray.length > 0) {
      return uniqueArray.map((card) => {
        var cardCount = 0;

        for (var i = 0; i < instantsArray.length; i++) {
          if(card.id == instantsArray[i].id) {
            cardCount++;
          }
        }

        return(
          <span onClick={() => this.handleCardClick(card)} key={card.id + Math.floor(Math.random() * 999)}>
          {cardCount}x {card.name}<br />
          </span>
        );
      })
    } else {
      return (
        <span> None </span>
      )
    }
  }

  renderEnchantments() {
    let cards = this.props.deck.cards;
    let enchanmentsArray = [];
    cards.map(card => {
      if (card.types[0] === "Enchantment" && card.types[1] !== "Creature") {
        enchanmentsArray.push(card);
      }
    })

    // Remove duplicates from Array
    var uniqueArray = _.map(
      _.uniq(
          _.map(enchanmentsArray, function(obj){
              return JSON.stringify(obj);
          })
      ), function(obj) {
          return JSON.parse(obj);
      }
    );

    if (uniqueArray.length > 0) {
      return uniqueArray.map((card) => {
        var cardCount = 0;

        for (var i = 0; i < enchanmentsArray.length; i++) {
          if(card.id == enchanmentsArray[i].id) {
            cardCount++;
          }
        }

        return(
          <span onClick={() => this.handleCardClick(card)} key={card.id + Math.floor(Math.random() * 999)}>
          {cardCount}x {card.name}<br />
          </span>
        );
      })
    } else {
      return (
        <span> None </span>
      )
    }
  }

  renderArtifacts() {
    let cards = this.props.deck.cards;
    let artifactsArray = [];
    cards.map(card => {
      if (card.types[0] === "Artifact" && card.types[1] !== "Creature") {
        artifactsArray.push(card);
      }
    });

    // Remove duplicates from Array
    var uniqueArray = _.map(
      _.uniq(
          _.map(artifactsArray, function(obj){
              return JSON.stringify(obj);
          })
      ), function(obj) {
          return JSON.parse(obj);
      }
    );

    if (uniqueArray.length > 0) {
      return uniqueArray.map((card) => {
        var cardCount = 0;

        for (var i = 0; i < artifactsArray.length; i++) {
          if(card.id == artifactsArray[i].id) {
            cardCount++;
          }
        }

        return(
          <span onClick={() => this.handleCardClick(card)} key={card.id + Math.floor(Math.random() * 999)}>
          {cardCount}x {card.name}<br />
          </span>
        );
      })
    } else {
      return (
        <span> None </span>
      );
    }
  }

  renderPlaneswalkers() {
    let cards = this.props.deck.cards;
    let planeswalkersArray = [];
    cards.map(card => {
      if (card.types[0] === "Planeswalker") {
        planeswalkersArray.push(card);
      }
    })

    var uniqueArray = _.map(
      _.uniq(
          _.map(planeswalkersArray, function(obj){
              return JSON.stringify(obj);
          })
      ), function(obj) {
          return JSON.parse(obj);
      }
    );

    if (uniqueArray.length > 0) {
      return uniqueArray.map((card) => {
        var cardCount = 0;

        for (var i = 0; i < planeswalkersArray.length; i++) {
          if(card.id == planeswalkersArray[i].id) {
            cardCount++;
          }
        }

        return(
          <span onClick={() => this.handleCardClick(card)} key={card.id + Math.floor(Math.random() * 999)}>
          {cardCount}x {card.name}<br />
          </span>
        );
      })
    } else {
      return (
        <span> None </span>
      );
    }
  }

  renderSideboard() {
    if (this.props.deck.sideboard) {
      let cards = this.props.deck.sideboard;
      // Remove duplicates from Array
      var uniqueArray = _.map(
        _.uniq(
            _.map(cards, function(obj){
                return JSON.stringify(obj);
            })
        ), function(obj) {
            return JSON.parse(obj);
        }
      );
      if (uniqueArray.length > 0) {
        return uniqueArray.map((card) => {
          var cardCount = 0;

          for (var i = 0; i < cards.length; i++) {
            if(card.id == cards[i].id) {
              cardCount++;
            }
          }
          return(
            <span onClick={() => this.handleCardClick(card)} key={card.id + Math.floor(Math.random() * 999)}>
            {cardCount}x {card.name}<br />
            </span>
          );
        })
      }


    } else {
      return <span>None </span>
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
            <p>{deck.description}</p>

            <div className="row">
              <div className="col-md-3">

                <div className="deck_detail_active_card">
                  {this.state.activeCard &&
                    <img src={this.state.activeCard.imageUrl} alt={this.state.activeCard.name} />
                  }
                </div>

                <div className="deck_detail_colors">
                  <div className="deck_detail_colors_header">
                    Colors
                  </div>
                  <div className="deck_detail_colors_body">
                  {this.renderColors()}
                  </div>
                </div>
                <br />

                <div className="deck_detail_cmc">
                  <div className="deck_detail_cmc_header">
                    Converted Mana Cost
                  </div>
                  <div className="deck_detail_cmc_body">
                  {this.renderCmc()}
                  </div>
                </div>
                <br />
              </div>

              <div className="col-md-3">
                <div className="deck_detail_well">
                  <div className="deck_detail_well_header">Creatures</div>
                  <div className="deck_detail_well_body">
                  {this.renderCreatures()}
                  </div>
                </div>
                <br />
                <div className="deck_detail_well">
                  <div className="deck_detail_well_header">Instants/Sorceries</div>
                  <div className="deck_detail_well_body">
                  {this.renderInstants()}
                  </div>
                </div>
                <br />
              </div>
              <div className="col-md-3">
                <div className="deck_detail_well">
                  <div className="deck_detail_well_header">Enchantments</div>
                  <div className="deck_detail_well_body">
                  {this.renderEnchantments()}
                  </div>
                </div>
                <br />
                <div className="deck_detail_well">
                  <div className="deck_detail_well_header">Artifacts</div>
                  <div className="deck_detail_well_body">
                  {this.renderArtifacts()}
                  </div>
                </div>
                <br />
                <div className="deck_detail_well">
                  <div className="deck_detail_well_header">Planeswalkers</div>
                  <div className="deck_detail_well_body">
                  {this.renderPlaneswalkers()}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="deck_detail_well">
                  <div className="deck_detail_well_header">Lands</div>
                  <div className="deck_detail_well_body">
                  {this.renderLands()}
                  </div>
                </div><br />
                <div className="deck_detail_well">
                  <div className="deck_detail_well_header">Sideboard</div>
                  <div className="deck_detail_well_body">
                  {this.renderSideboard()}
                  </div>
                </div>
              </div>
            </div>
            <button className="hand_button" onClick={() => this.handleHandClick()}> Get Sample Hand</button>
            {this.state.handShown &&
              <SampleHand deck={this.props.deck}/>
            }
          </div>
        </div>
      );
    } else {
      return (
        <div>
        <h2>Loading Deck...</h2>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { deck: state.decks.deck };
}

export default connect(mapStateToProps, { fetchDeck: fetchDeck })(DeckDetail);
