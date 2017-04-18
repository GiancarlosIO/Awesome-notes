import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { updateNoteFromApi } from '../../actions/notes';
import _ from 'lodash';

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
  constructor() {
    super();
    this.state = {
      text: null,
      loading: ''
    }
  }

  handleOnChange = (e) => {
    const text = this.textarea.value;
    this.setState({ text }, (newState) => {
      console.log('value of textarea', this.state.text);
      this.updateNote(this.props.noteSelected.id, this.state.text);
    });
  }

  updateNote = _.debounce((noteId, text) => {
    this.props.dispatch(updateNoteFromApi(noteId, text));
  }, 400);

  componentWillReceiveProps(nextProps) {
    const { noteSelected } = nextProps;
    const { noteSelected: oldNoteSelected } = this.props;
    if (noteSelected !== oldNoteSelected) {
      this.setState({text: noteSelected.text});
    }
  }

  componentDidUpdate(prevProps) {
    const { noteSelected } = prevProps;
    const { noteSelected: oldNoteSelected } = this.props;
    if (noteSelected !== oldNoteSelected) {
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
          autoFocus={this.state.text}
          ref={ (el) => {this.textarea = el;} }
          value={this.state.text ? this.state.text : ''}
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