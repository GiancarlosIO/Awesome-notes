import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import Container from '../../grid/container';
import Column from '../../grid/column';

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
  render() {
    return (
      <input type="text" placeholder="Seach notes" style={styles.base}/>
    )
  }
}

const SearchBarRadium = Radium()(SearchBar);
export default connect()(SearchBarRadium);