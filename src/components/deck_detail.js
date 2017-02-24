import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { action1, action2 } from '../actions.index';
import { Link } from 'react-router';

export default class DeckDetail extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    // Fetch specific deck here using ID
  }

  render() {
    return (
      <div>Deck Detail for Deck ID: {this.props.params.id}</div>
    );
  }
}
