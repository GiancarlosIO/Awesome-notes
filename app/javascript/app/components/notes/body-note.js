import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

const styles = {
  base: {
    width: '100%',
    minWidth: '100%',
    height: '100%',
    minHeight: '100%',
    padding: '15px 30px',
    boxSizing: 'border-box',
    border: '1px solid transparent',
    fontFamily: 'Open Sans',
    fontSize: '16px',
    color: '#25373D',
    ':focus': {
      border: '1px solid transparent',
      outline: 'none'
    }
  }
}

export class BodyNote extends Component {
  handleOnChange = (e) => {
      const val = this.textarea.value;
      console.log('value of textarea', val);
    }

  componentDidMount() {
    if (this.props.noteSelected) {
      this.textarea.focus();
    }
  }

  componentDidUpdate() {
    if (this.props.noteSelected) {
      this.textarea.focus();
    }
  }

  render() {
    const { noteSelected } = this.props;
    return noteSelected ?
      (
        <textarea
          style={styles.base}
          onChange={this.handleOnChange}
          ref={ (el) => {this.textarea = el;} }
          value={noteSelected ? noteSelected.text : ''}
          />
      ) :
      null
  }
}

const BodyNoteRadium = Radium(BodyNote);

function mapStateToProps(state) {
  return {
    noteSelected: state.notes.noteSelected
  }
}

export default connect(mapStateToProps)(BodyNoteRadium);