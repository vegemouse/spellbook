import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
// import { action } from '../actions/index';
import { Link } from 'react-router';

export default class NewDeck extends Component {

  // Used for routing after submit
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    return (
      <div>New Deck Component!</div>
    );
  }
}
