import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { fetchDecks, fetchDeck } from '../actions/index';

class ProxyPage extends Component {

  componentWillMount() {
    this.props.fetchDeck(this.props.params.id);
    console.log(this.props);
  }

  renderCards() {
    let cards = this.props.deck.cards;
    return cards.map((card) => {
      return (
        <img src={card.imageUrl} alt={card.name} key={Math.floor(Math.random() * 99999)} />
      )
    })
  }

  renderSideboard() {
    if (this.props.deck.sideboard) {
      let cards = this.props.deck.sideboard;
      return cards.map((card) => {
        return (
          <img src={card.imageUrl} alt={card.name} key={Math.floor(Math.random() * 99999)} />
        )
      })
    }
  }

  renderMaybeboard() {
    if (this.props.deck.maybeboard) {
      let cards = this.props.deck.maybeboard;
      return cards.map((card) => {
        return (
          <img src={card.imageUrl} alt={card.name} key={Math.floor(Math.random() * 99999)} />
        )
      })
    }
  }

  printPage() {
    window.print();
  }

  render() {
    if (this.props.deck) {
      return (
        <div className="proxy-page">
          <br />
          <button className="print-button" onClick={() => {this.printPage()}}>Print</button>
          <Link to={"/decks/" + this.props.params.id} className="back-button">Go Back</Link><br />
          {this.renderCards()}
          {this.renderSideboard()}
          {this.renderMaybeboard()}

        </div>

      )
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

export default connect(mapStateToProps, { fetchDeck: fetchDeck })(ProxyPage);
