import React, { Component } from 'react';
import Radium from 'radium';

class NotesMain extends Component {
  render() {
    return (
      <div>
        <h1>Protected</h1>
      </div>
    )
  }
}

export default Radium()(NotesMain);