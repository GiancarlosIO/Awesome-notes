import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import Container from '../../grid/container';
import Column from '../../grid/column';
import { setSearchText } from '../../actions/notes';

const styles =  {
  base: {
    border: '1px solid rgba(0,0,0,0.4)',
    padding: '3px 8px',
    fontFamily: 'open sans',
    fontSize: '12px',
    borderRadius: '5px',
    width: '100%',
    color: '#2c3e50',
    transition: 'all 0.3s ease',
    ':focus': {
      outline: 'none',
      border: '1px solid #27D0B9',
    }
  }
}

export class SearchBar extends Component {

  handleChange = () => {
    const text = this.inputText.value;
    if (text.length > 0) {
      this.props.dispatch(setSearchText(text));
    } else {
      this.props.dispatch(setSearchText(null));
    }
  }

  render() {
    const { searchText } = this.props;
    return (
      <input
        ref={ (el) => {this.inputText = el;} }
        type="text"
        placeholder="Seach notes"
        style={styles.base}
        onChange={this.handleChange}
        value={ searchText }
      />
    )
  }
}

const SearchBarRadium = Radium()(SearchBar);

const mapStateToProps = (state) => ({ searchText: state.notes.searchText })

export default connect()(SearchBarRadium);