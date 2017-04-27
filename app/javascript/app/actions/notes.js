import {
  FETCH_NOTES,
  ADD_NOTE,
  DELETE_NOTE,
  UPDATE_NOTE,
  SELECT_NOTE,
  SET_SEARCH_TEXT,
  UPDATE_NOTE_SELECTED,
  UPDATE_TAGS,
  SET_TAGS,
  SELECT_TAG
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
export const selectNote = (noteId) => ({ type: SELECT_NOTE, payload: noteId });
export const setSearchText = (text) => ({ type: SET_SEARCH_TEXT, payload: text });
export const updateNoteSelected = (note) => ({ type: UPDATE_NOTE_SELECTED, payload: note });
export const updateTags = (tag_name) => ({ type: UPDATE_TAGS, payload: tag_name });
export const setTags = (tags) => ({ type: SET_TAGS, payload: tags });
export const selectTag = (tag) => ({ type: SELECT_TAG, payload: tag });

export const fetchNotesFromApi = () => {
  return (dispatch, getState, { NoteAPI }) => {
    return NoteAPI.fetchNotes().request.then(
      (response) => {
        let objNotes = {};
        const notes = response.data.notes;
        notes.forEach( note => objNotes[`${note.id}`] = note );
        const lastNote = objNotes[Object.keys(objNotes)[0]];
        dispatch(fetchNotes({notes: objNotes, tags: response.data.tags}));
        dispatch(selectNote(lastNote.id));
        // console.log('fetch notes', response);
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
        // console.log('added note', response);
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
    const olderNote = {...getState().notes.all[noteId]};
    const newNote = {...olderNote, text: text};
    dispatch(updateNote(newNote));
    return NoteAPI.updateNote(noteId, text).request.then(
      (response) => {
        console.log('note Update', response);
      },
      (error) => {
        console.log('error to update', error.response);
        dispatch(updateNote(olderNote));
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
        const tags = response.data.tags;
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
        dispatch(setTags(tags));
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

export const updateTag = (tag_name, note_id) => {
  return (dispatch, getState, { TagAPI }) => {
    return TagAPI.updateTag(tag_name, note_id).request.then(
      (response) => {
        const note = response.data.note;
        dispatch(updateNote(note))
        dispatch(updateTags(tag_name));
        console.log('tag updated', response.data);
      }
    ).catch((error) => {
      console.log('error to update tags', error);
    })
  }
}