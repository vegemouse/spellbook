import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer_content">
        Created by <a href="http://vegemouse.github.io/portfolio-2">Maxwell Cady</a><br /><br />
        Card Images by <a href="http://gatherer.wizards.com/Pages/Default.aspx">Gatherer</a><br />
        <br /><a href="https://github.com/vegemouse/spellbook"><i className="fa fa-github" aria-hidden="true"></i></a>
        </div>
      </footer>
    );
  }
}
