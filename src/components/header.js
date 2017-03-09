import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <header>
        <Link to="/"><img src="/img/Logo.png" alt="Spellbook" /></Link>
        <div className="header_buttons_newdeck">
          <Link className="build" to="/decks/new">Build a Deck</Link>
          <Link className="all" to="/">View Decks</Link>
        </div>
      </header>
    );
  }

}
