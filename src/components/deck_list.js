import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { fetchDecks } from '../actions/index';
import Deck from './deck';
import SearchBar from './search_bar';

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormat: "All",
      inputtedName: null
    }
    this.handleFormatChange = this.handleFormatChange.bind(this);
  }
  componentWillMount() {
    this.props.fetchDecks();
  }

  renderDecks() {
    if (Object.keys(this.props.decks).length > 0) {

      // If No name is entered
      if (!this.state.inputtedName) {
        // If Format is NOT selected
        if (this.state.selectedFormat === "All") {
          //Search all decks
          return _.map(this.props.decks, (deck, key) => {
            return (
                <Link key={key} to={"decks/" + key}>
                    <div className="col-sm-4">
                      <Deck deck={deck}/>
                    </div>
                </Link>
            );
          });
        } else if (this.state.selectedFormat){
          // if Format IS selected
          return _.map(this.props.decks, (deck, key) => {
            if (deck.format === this.state.selectedFormat) {
              return (
                <Link key={key} to={"decks/" + key}>
                  <div className="col-sm-4">
                    <Deck deck={deck}/>
                  </div>
                </Link>
              );
            }
          });
        }
      } else {
        // if Name is entered, but no format is selected
        if (this.state.selectedFormat === "All") {
          return _.map(this.props.decks, (deck, key) => {
            if (deck.name.toLowerCase().includes(this.state.inputtedName.toLowerCase())) {
              return (
                <Link key={key} to={"decks/" + key}>
                  <div className="col-sm-4">
                    <Deck deck={deck}/>
                  </div>
                </Link>
              );
            }
          });
        } else {
          // If Name & Format are both selected
          if (this.state.selectedFormat) {
            return _.map(this.props.decks, (deck, key) => {
              if (deck.format === this.state.selectedFormat && deck.name.toLowerCase().includes(this.state.inputtedName.toLowerCase())) {
                return (
                  <Link key={key} to={"decks/" + key}>
                    <div className="col-sm-4">
                      <Deck deck={deck}/>
                    </div>
                  </Link>
                );
              }
            });
        }
      }
    }
    } else {
    return <h3 className="loading">loading decks...</h3>
    }
  }


  handleFormatChange(event) {
    this.setState({selectedFormat: event.target.value});
  }

  deckSearch(term) {
    this.setState({inputtedName: term});
  }

  render() {

    const deckSearch = _.debounce((term) => {this.deckSearch(term)}, 300);

    return(
      <div className="container">
        <h2>{this.state.selectedFormat} Decks</h2>
        <div className="deck_inputs row">
          <div className="deck_inputs_group">

            <label>Deck Search</label>
            <SearchBar onSearchTermChange={deckSearch} />&nbsp;&nbsp;&nbsp;

            <label>Format Filter</label>
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
