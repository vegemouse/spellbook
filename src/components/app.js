import React, { Component } from 'react';
import { RouteTransition } from 'react-router-transition';
import Header from './header';
import Footer from './footer';

export default class App extends Component {
  render() {
    return (
      <div>
      <Header />
      <div id="wrapper">
        <RouteTransition
        pathname={this.props.location.pathname}
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        runOnMount={false}
        >
          {this.props.children}
        </RouteTransition>
      </div>
      <Footer />
      </div>
    );
  }
}
