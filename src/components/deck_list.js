import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchDecks } from '../actions/index';
import _ from 'lodash';

class DeckList extends Component {
  componentWillMount() {
    this.props.fetchDecks();
  }

  renderDecks() {
    for(var i in this.props.decks) {
      return (
        <div>{this.props.decks[i]}</div>
      )
    }
  }

  renderDecks() {
    return _.map(this.props.decks, (deck, key) => {
      return (
        <div>{deck.name}</div>
      )
    });
  }


  render() {
    return(
      <div>{this.renderDecks()}</div>
    );
  }
}

function mapStateToProps(state) {
  return { decks: state.decks.decks };
}

export default connect(mapStateToProps, { fetchDecks: fetchDecks })(DeckList);
