import React, { Component } from 'react';
import Radium from 'radium';
import Container from '../../grid/container';
import Column from '../../grid/column';

// Components
import SearchBar from './search-bar';
import AddNote from './add-note';
import Menu from './menu';
import ListNote from './list-note';
import Note from './note';

const styles = {
  baseColumn: {
    borderRight: '1px solid rgba(0,0,0,0.15)',
    borderTop: '1px solid rgba(0,0,0,0.15)',
    borderBottom: '1px solid rgba(0,0,0,0.15)',
    padding: '10px',
  },
  borderLeft: {
    borderLeft: '1px solid rgba(0,0,0,0.15)',
  },
  borderRight: {
    padding: '10px',
    borderRight: '1px solid rgba(0,0,0,0.15)'
  },
  borderLeftRight: {
    padding: '10px',
    borderLeft: '1px solid rgba(0,0,0,0.15)',
    borderRight: '1px solid rgba(0,0,0,0.15)'
  },
  borderBottom: {
    padding: '10px',
    borderBottom: '1px solid rgba(0,0,0,0.15)'
  },
  fullHeight: {
    height: 'calc(100vh - 80px)'
  }
}

class NotesMain extends Component {
  render() {
    return (
      <Container>
        <Container noPadding>
          <Column width="2" minWidth="250px" extraStyles={{...styles.baseColumn, ...styles.borderLeft}}>
            <SearchBar />
            <AddNote />
          </Column>
          <Column width="8" minWidth="900px" extraStyles={styles.baseColumn}>
            <Menu />
          </Column>
        </Container>
        <Container noPadding extraStyles={styles.fullHeight}>
          <Column width="2" minWidth="250px" extraStyles={{...styles.borderLeftRight, ...styles.borderBottom}}>
            <ListNote />
          </Column>
          <Column width="8" minWidth="900px" extraStyles={{...styles.borderRight, ...styles.borderBottom}}>
            <h1>TEXT BODY</h1>
          </Column>
        </Container>
      </Container>
    )
  }
}

export default Radium()(NotesMain);