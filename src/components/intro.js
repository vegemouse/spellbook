import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Intro extends Component {
  render() {
    return (
      <div className="intro">
        <div className="intro_content">
          <Link to="/"><img src="/img/Logo-Main.png" alt="Spellbook" /></Link><br />
          <Link to="/decks/new"><button className="intro_build">Build a Deck</button></Link>
          <Link to="/decks"><button className="intro_all">View Decks</button></Link><br />
        </div>
      </div>
    );
  }
}
