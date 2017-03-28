import React, { Component } from 'react';
import Radium from 'radium';
import Column from '../../grid/column';

const styles = {
  base: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    height: '300px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: '32px',
    lineHeight: '30px',
    letterSpacing: '1.5px',
    color: '#EB524A',
    margin: '0'
  },
  paragraph: {
    fontSize: '20px',
    lineHeight: '30px',
    letterSpaccing: '0.8px',
    color: '#27D0B9'
  }
}

class HomeSection extends Component {
  render() {
    return (
      <Column width={10}>
        <div style={styles.base}>
          <h1 style={styles.title}>Awesome Notes App</h1>
          <p style={styles.paragraph}>A simple note application for learning purposes...</p>
        </div>
      </Column>
    )
  }
}

export default Radium()(HomeSection);