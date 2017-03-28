import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    padding: '15px',
    display: 'flex',
  },
  row: {
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
  },
  yCenter: {
    alignItems: 'center'
  }
}

class Container extends Component {
  render() {
    const { row, column, yCenter, extraStyles, bg } = this.props;
    return (
      <div style={[styles.base, extraStyles && extraStyles ,row && styles.row, yCenter && styles.yCenter, column && styles.column]}>
        {this.props.children}
      </div>
    )
  }
}

export default Radium()(Container);