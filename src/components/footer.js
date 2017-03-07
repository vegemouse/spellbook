import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer_content">
        Created by <a href="http://vegemouse.github.io/portfolio-2">Maxwell Cady</a><br /><br />
        Card Images by <a href="http://gatherer.wizards.com/Pages/Default.aspx">The Gatherer</a><br />

        </div>
      </footer>
    );
  }

}
