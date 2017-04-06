import React, { Component } from 'react';
import Radium from 'radium';
import Container from '../../grid/container';
import Column from '../../grid/column';

// Components
import SearchBar from './search-bar';
import AddNote from './add-note';
import Menu from './menu';

const styles = {
  baseColumn: {
    borderRight: '1px solid rgba(0,0,0,0.15)',
    borderTop: '1px solid rgba(0,0,0,0.15)',
    borderBottom: '1px solid rgba(0,0,0,0.15)',
    padding: '10px',
  },
  borderLeft: {
    borderLeft: '1px solid rgba(0,0,0,0.15)',
  }
}

class NotesMain extends Component {
  render() {
    return (
      <Container>
        <Column width="2" minWidth="250px" extraStyles={{...styles.baseColumn, ...styles.borderLeft}}>
          <SearchBar />
          <AddNote />
        </Column>
        <Column width="8" minWidth="900px" extraStyles={styles.baseColumn}>
          <Menu />
        </Column>
      </Container>
    )
  }
}

export default Radium()(NotesMain);