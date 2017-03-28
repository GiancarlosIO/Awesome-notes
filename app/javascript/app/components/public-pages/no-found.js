import React, { Component } from 'react';
import Radium from 'radium';
import Link from '../navigation/link';

const styles = {
  base: {
    width: '90vw',
    margin: '0 auto',
    backgroundColor: '#64C4AF',
    height: '400px',
    fontSize: '24px',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'calc( 100vh - 550px )'
  }
}

class NoFound extends Component {
  render() {
    return (
      <div style={styles.base}>
        <h1>404-NO MATCH</h1>
        <div>
          <Link path="/" noStyles>
            Return to home
          </Link>
        </div>
      </div>
    )
  }
}

export default Radium()(NoFound);