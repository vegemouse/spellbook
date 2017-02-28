import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { fetchCards } from '../actions/index';
import { Link } from 'react-router';
import axios from "axios";
import { connect } from 'react-redux';


class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {inputtedCard: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Used for routing after submit
  static contextTypes = {
    router: PropTypes.object
  }

  renderCards() {
    return this.props.foundCards.map((card) => {
      return(
        <li key={card.id}>
          {card.name}
        </li>
      );
    });
  }

  handleChange(event) {
    this.setState({inputtedCard: event.target.value});
  }

  handleSubmit(event) {
    this.props.fetchCards(this.state.inputtedCard)
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div>New Deck Component!</div>

        <form onSubmit={this.handleSubmit}>

          <label>Card name</label>

          <input type="text" value={this.state.inputtedCard} onChange={this.handleChange} />

          <button type="submit">Get Cards</button>

        </form>

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
