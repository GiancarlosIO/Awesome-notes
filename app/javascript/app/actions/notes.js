import {
  FETCH_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  SELECT_NOTE
} from '../constants/';

import {
  setAuthApiHeaderConfig
} from '../utils/apis/header-config';

export const fetchNotes = (notes) => ({ type: FETCH_NOTES, payload: notes });
export const addNote = (note) => ({ type: ADD_NOTE, payload: note });
export const deleteNote = (noteId) => ({ type: DELETE_NOTE, payload: noteId });
export const updateNote = (note) => ({ type: UPDATE_NOTE, payload: note });
export const selectNote = (note) => ({ type: SELECT_NOTE, payload: note });

export const fetchNotesFromApi = () => {
  return (dispatch, getState, { NoteAPI }) => {
    return NoteAPI.fetchNotes().request.then(
      (response) => {
        setAuthApiHeaderConfig(response.headers, undefined);
        let objNotes = {};
        response.data.notes.forEach( note => objNotes[`${note.id}`] = note );
        dispatch(fetchNotes(objNotes));
        console.log('fetch notes', response);
      },
      (error) => { console.log('error to fetch notes', error.response); }
    )
  }
}

export const addNoteFromApi = (text) => {
  return (dispatch, getState, { NoteAPI }) => {
    return NoteAPI.addNote(text).request.then(
      (response) => {
        setAuthApiHeaderConfig(response.headers, undefined);
        dispatch(addNote(response.data.note));
        console.log('added note', response);
      },
      (error) => { console.log('error to add a note', error.response); }
    )
  }
}