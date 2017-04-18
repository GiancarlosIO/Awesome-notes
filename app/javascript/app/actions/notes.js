import {
  FETCH_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  SELECT_NOTE,
  SET_SEARCH_TEXT
} from '../constants/';

import {
  unauthUser
} from './auth-user'

import {
  resetAuthApiHeaderConfig,
  setAuthApiHeaderConfig
} from '../utils/apis/header-config';

export const fetchNotes = (notes) => ({ type: FETCH_NOTES, payload: notes });
export const addNote = (note) => ({ type: ADD_NOTE, payload: note });
export const deleteNote = (noteId) => ({ type: DELETE_NOTE, payload: noteId });
export const updateNote = (note) => ({ type: UPDATE_NOTE, payload: note });
export const selectNote = (note) => ({ type: SELECT_NOTE, payload: note });
export const setSearchText = (text) => ({ type: SET_SEARCH_TEXT, payload: text })

export const fetchNotesFromApi = () => {
  return (dispatch, getState, { NoteAPI }) => {
    return NoteAPI.fetchNotes().request.then(
      (response) => {
        let objNotes = {};
        response.data.notes.forEach( note => objNotes[`${note.id}`] = note );
        dispatch(fetchNotes(objNotes));
        console.log('fetch notes', response);
      },
      (error) => {
        console.log('error to fetch notes', error.response);
        if (error.response.status === 401) {
          resetAuthApiHeaderConfig();
          dispatch(unauthUser());
        }
      }
    )
  }
}

export const addNoteFromApi = (text) => {
  return (dispatch, getState, { NoteAPI }) => {
    return NoteAPI.addNote(text).request.then(
      (response) => {
        dispatch(addNote(response.data.note));
        dispatch(selectNote(response.data.note.id));
        console.log('added note', response);
      },
      (error) => {
        console.log('error to add a note', error.response);
        if (error.response.status === 401) {
          resetAuthApiHeaderConfig();
          dispatch(unauthUser());
        }
      }
    )
  }
}

export const updateNoteFromApi = (noteId, text) => {
  return (dispatch, getState, { NoteAPI }) => {
    return NoteAPI.updateNote(noteId, text).request.then(
      (response) => {
        dispatch(updateNote(response.data.note));
        console.log('note Update', response);
      },
      (error) => {
        console.log('error to update', error.response);
        if (error.response.status === 401) {
          resetAuthApiHeaderConfig();
          dispatch(unauthUser());
        }
      }
    )
  }
}

export const deleteNoteFromApi = (noteId) => {
  return (dispatch, getState, { NoteAPI }) => {
    return NoteAPI.deleteNote(noteId).request.then(
      (response) => {
        const notes = getState().notes.all;
        const keys = Object.keys(notes);
        let noteIndex = keys.findIndex( index => index == noteId );
        if (keys.length > 1 ) {
          if (notes[keys[noteIndex + 1]]) {
            dispatch(selectNote(notes[keys[noteIndex + 1]].id));
          } else {
            dispatch(selectNote(notes[keys[0]].id));
          };
        } else if ( keys.length === 1 ) {
          dispatch(selectNote(null));
        }
        dispatch(deleteNote(noteId));
        console.log('note deleted', response);
      },
      (error) => {
        console.log('error to delete the note', error.response);
        if (error.response.status === 401) {
          resetAuthApiHeaderConfig();
          dispatch(unauthUser());
        }
      }
    )
  }
}