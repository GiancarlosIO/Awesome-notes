import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    display: 'flex'
  },
  1: {
    width: '10%'
  },
  2: {
    width: '20%'
  },
  3: {
    width: '30%'
  },
  4: {
    width: '40%'
  },
  5: {
    width: '50%'
  },
  6: {
    width: '60%'
  },
  7: {
    width: '70%'
  },
  8: {
    width: '80%'
  },
  9: {
    width: '90%'
  },
  10: {
    width: '100%'
  }
}

class Column extends Component {
  render() {
    const { width } = this.props;
    return (
      <div style={[styles.base, width && styles[width]]}>
       { this.props.children }
      </div>
    )
  }
}

export default Radium()(Column);