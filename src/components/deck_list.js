import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { actionName } from '../actions/index';

class DeckList extends Component {
  componentWillMount() {
    // this.props.fetchDecks();
  }


  render() {
    return(
      <div>Deck List Component</div>
    );
  }
}

function mapStateToProps(state) {
  return { null }
}

export default connect(mapStateToProps)(DeckList);
