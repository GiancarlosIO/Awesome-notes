import { createSelector } from 'reselect';

const getSearchText = (state) => state.notes.searchText;
const getNotes = (state) => state.notes.all;

export const getFilteredNotes = createSelector(
  [ getSearchText, getNotes ],
  (searchText, notes) => {
    if (searchText) {
      let notesFiltered = {};
      Object.keys(notes).forEach( index => {
        if (notes[index].text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ) {
          notesFiltered[`${notes[index].id}`] = notes[index];
        }
      });
      return notesFiltered;
    } else {
      return notes;
    }
  }
)

