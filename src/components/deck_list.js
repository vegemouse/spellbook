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
    if (Object.keys(this.props.decks).length > 0) {
      return _.map(this.props.decks, (deck, key) => {
        return (
          <Link key={key} to={"decks/" + key}>
          <div className="col-md-4">
          <Deck deck={deck}/>
          </div>
          </Link>
        );
      });
    } else {
      return <h3>Loading decks...</h3>
    }
  }


  render() {
    return(
      <div className="container">
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
