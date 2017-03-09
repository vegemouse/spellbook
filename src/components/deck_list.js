import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchDecks } from '../actions/index';
import  Deck from './deck';
import _ from 'lodash';

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormat: "All",
    }
    this.handleFormatChange = this.handleFormatChange.bind(this);
  }
  componentWillMount() {
    this.props.fetchDecks();
  }

  renderDecks() {
    if (Object.keys(this.props.decks).length > 0) {

      if (this.state.selectedFormat === "All"){
        return _.map(this.props.decks, (deck, key) => {
          if (deck.format) {
            return (
              <Link key={key} to={"decks/" + key}>
              <div className="col-md-4">
              <Deck deck={deck}/>
              </div>
              </Link>
            );
          }
        });
      } else if (this.state.selectedFormat) {
        return _.map(this.props.decks, (deck, key) => {
          if (deck.format === this.state.selectedFormat) {
            return (
              <Link key={key} to={"decks/" + key}>
              <div className="col-md-4">
              <Deck deck={deck}/>
              </div>
              </Link>
            );
          }
        });
      }
    } else {
      return <h3>Loading decks...</h3>
    }
  }

  handleFormatChange(event) {
    this.setState({selectedFormat: event.target.value});
  }

  render() {
    return(
      <div className="container">
        <h2>{this.state.selectedFormat} Decks</h2>
        <div className="deck_inputs row">
          <div className="deck_inputs_group"><label>Format Filter</label>
            <select value={this.state.selectedFormat} onChange={this.handleFormatChange}>
              <option value="All">All Formats</option>
              <option value="Standard">Standard</option>
              <option value="Modern">Modern</option>
              <option value="Legacy">Legacy</option>
              <option value="Vintage">Vintage</option>
              <option value="EDH/Commander">EDH/Commander</option>
              <option value="Pauper">Pauper</option>
              <option value="Peasant">Peasant</option>
              <option value="Archenemy">Archenemy</option>
              <option value="Vanguard">Vanguard</option>
              <option value="Planechase">Planechase</option>
            </select>
          </div>
        </div>

        <div className="row">
          {this.renderDecks()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { decks: state.decks.decks };
}

export default connect(mapStateToProps, { fetchDecks: fetchDecks })(DeckList);
