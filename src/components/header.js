import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <header>
        <Link to="/"><img src="/img/Logo.png" alt="Spellbook" /></Link>
        <div className="header_buttons_newdeck"><Link to="/decks/new">Build a Deck</Link></div>
      </header>
    );
  }

}
