import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    border: "1px solid #27D0B9",
    backgroundColor: '#fff',
    padding: '20px',
    fontFamily: 'open sans',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '200px',
    height: '130px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    ':hover': {
      boxShadow: '0 10px 5px rgba(0,0,0,0.3)'
    }
  },
  title: {
    margin: '0',
    color: '#11132F',
    fontSize: '18px',
    textAlign: 'center',
    letterSpacing: '1px'
  },
  paragraph: {
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '300',
    fontSize: '12px',
    lineHeight: '21px',
    letterSpacing: '0.8px'
  }
}

class Benefit extends Component {
  render() {
    const { title, paragraph } = this.props;
    return (
      <div style={styles.base}>
        <h1 style={styles.title}>
          { title }
        </h1>
        <p style={styles.paragraph}>
          { paragraph }
        </p>
      </div>
    )
  }
}

export default Radium()(Benefit);