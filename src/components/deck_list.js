import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchDecks } from '../actions/index';
import  Deck from './deck';
import _ from 'lodash';

class DeckList extends Component {
  componentWillMount() {
    this.props.fetchDecks();
  }

  renderDecks() {
    return _.map(this.props.decks, (deck, key) => {
      return (
        <Link to={"decks/" + key}>
          <div key={key} className="col-md-4">
            <Deck deck={deck}/>
          </div>
        </Link>
      );
    });
  }


  render() {
    return(
      <div className="container">
      <h2>All Decks</h2>
        <div className="row">
          {this.renderDecks()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { decks: state.decks.decks };
}

export default connect(mapStateToProps, { fetchDecks: fetchDecks })(DeckList);
