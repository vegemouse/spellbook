import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { fetchCards, selectCard } from '../actions/index';
import { connect } from 'react-redux';

class CardSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputtedCard: '',
      searchSubmitted: false,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleCardClick(card) {
    this.props.selectCard(card);
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
          <li key={card.id} onClick={() => this.handleCardClick(card)}>
            <strong>{card.name}</strong> - ({card.set})
            <span className="pull-right">{card.types[0]}</span>
          </li>
        );
      }
    });
  }

  render() {
    return(
      <div className="card_search col-sm-4">
        <form onSubmit={this.handleSubmit}>
          <h4>Search Card Name</h4>
          <div className="card_search_input"><input type="text" value={this.state.inputtedCard} onChange={this.handleSearchChange} />
          <button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button></div>
        </form>
        <ul>
          {this.renderResults()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { foundCards: state.cards.foundCards };
}

export default connect(mapStateToProps, {fetchCards: fetchCards, selectCard: selectCard})(CardSearch);
