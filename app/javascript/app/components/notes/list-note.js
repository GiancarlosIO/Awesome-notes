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
      console.log('noteId selected', id);
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchNotesFromApi());
  }

  renderNotes = () => {
    const { notes, noteSelected } = this.props;
    const notesArray = Object.keys(notes).map( index => {
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
    noteSelected: state.notes.noteSelected
  }
};

export default connect(mapStateToProps)(ListNote);