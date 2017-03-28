import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    padding: '15px'
  }
}

class Container extends Component {
  render() {
    return (
      <div style={style.base}>
        {this.props.children}
      </div>
    )
  }
}

export default Radium()(Container);