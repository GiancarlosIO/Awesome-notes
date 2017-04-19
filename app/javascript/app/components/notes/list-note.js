import Radium from 'radium';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../../grid/container';
import Column from '../../grid/column';
import { fetchNotesFromApi, selectNote } from '../../actions/notes';
import { getFilteredNotes } from '../../selectors/';

import Note from './note';

export class ListNote extends Component {

  selectNote = (id) => {
    const { noteSelected } = this.props;
    if (id !== noteSelected.id ) {
      this.props.dispatch(selectNote(id));
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchNotesFromApi());
  }

  renderNotes = () => {
    const { notes, noteSelected } = this.props;
    const notesKeys = Object.keys(notes);
    const notesArray = notesKeys.map( index => {
      let noteElement = notes[index];
      const noteSelectedId = noteSelected ? noteSelected.id : undefined;
      return (
        <Column width="10" key={noteElement.id} extraStyles={{height: '40px'}}>
          <Note {...noteElement} handleSelectNote={this.selectNote} selected={noteSelectedId === noteElement.id}/>
        </Column>
      );
    });
    return notesArray;
  }

  componentDidUpdate() {
    const { notes, noteSelected, searchText, dispatch } = this.props;
    // select first note only when note selected is not in the list filtered and the notes length > 0
    const notesKeys = Object.keys(notes);
    if (noteSelected) {
      if (searchText && !notesKeys.includes(noteSelected.id.toString()) && notesKeys.length > 0 ) {
        const noteToSelect = notes[notesKeys[0]];
        dispatch(selectNote(noteToSelect.id));
      } else if (notesKeys.length === 0) {
        dispatch(selectNote(null));
      }
    } else if ( notesKeys.length > 0 ) {
      const noteToSelect = notes[notesKeys[0]];
      dispatch(selectNote(noteToSelect.id));
    }
  }

  render() {
    return (
      <Container width="10" noPadding extraStyles={{justifyContent: 'flex-start', flexFlow: 'column'}}>
        { this.renderNotes() }
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    notes: getFilteredNotes(state),
    searchText: state.notes.searchText,
    noteSelected: state.notes.noteSelected
  }
};

export default connect(mapStateToProps)(ListNote);