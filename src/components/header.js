import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <header>
        <Link to="/decks"><img src="/img/Logo.png" alt="Spellbook" /></Link>
        <div className="header_buttons_newdeck">
          <Link className="build" to="/decks/new">Build a Deck</Link>
          <Link className="all" to="/decks">View Decks</Link>
        </div>
      </header>
    );
  }

}
