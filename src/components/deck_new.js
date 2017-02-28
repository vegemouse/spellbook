import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { fetchCards } from '../actions/index';
import { Link } from 'react-router';
import axios from "axios";
import { connect } from 'react-redux';


class NewDeck extends Component {

  // Used for routing after submit
  static contextTypes = {
    router: PropTypes.object
  }

  renderCards() {
    return this.props.foundCards.map((card) => {
      return(
        <li>
          {card.name}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div>New Deck Component!</div>
        <button onClick={this.props.fetchCards}>Get Nissas</button>
        <ul>
          <div>{this.renderCards()}</div>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { foundCards: state.cards.foundCards };
}

export default connect(mapStateToProps, {fetchCards: fetchCards})(NewDeck);
