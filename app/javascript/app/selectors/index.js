import { createSelector } from 'reselect';

const getSearchText = (state) => state.notes.searchText;
const getNotes = (state) => state.notes.all;

const getSearchTag =(state) => state.notes.searchTag;

export const getFilteredNotes = createSelector(
  [ getSearchText, getNotes ],
  (searchText, notes) => {
    if (searchText) {
      let notesFiltered = {};
      Object.keys(notes).forEach( index => {
        const note = notes[index];
        if (note.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ) {
          notesFiltered[`${note.id}`] = note;
        }
      });
      return notesFiltered;
    } else {
      return notes;
    }
  }
)

export const getFilteredNotesByTag = createSelector(
  [getFilteredNotes, getSearchTag],
  (notes, searchTag) => {
    if (searchTag) {
      console.log('search tag from reselect', searchTag)
      let notesFiltered = {};
      Object.keys(notes).map( index => {
        const note = notes[index];
        if (note.tags.indexOf(searchTag) > -1) {
          notesFiltered[note.id] = note;
        };
      });
      return notesFiltered;
    } else {
      return notes;
    }
  }
)