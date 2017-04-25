import {
  FETCH_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  SELECT_NOTE,
  SET_SEARCH_TEXT,
  UPDATE_NOTE_SELECTED,
  UPDATE_TAGS
} from '../constants/';

const initialState = {
  all: {},
  noteSelected: null,
  tags: null,
  searchText: null,
  searchTag: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTES:
      return {
        ...state,
        all: action.payload.notes,
        tags: action.payload.tags
      };
    case ADD_NOTE:
      return {
        ...state,
        all: {
          [`${action.payload.id}`]: action.payload,
          ...state.all
        }
      };
    case DELETE_NOTE:
      let notes = {...state.all};
      delete notes[`${action.payload}`];
      return {
        ...state,
        all: { ...notes }
      };
    case UPDATE_NOTE:
      return {
        ...state,
        all: {
          ...state.all,
          [`${action.payload.id}`]: action.payload
        },
        noteSelected: action.payload
      };
    case SELECT_NOTE:
      return {
        ...state,
        noteSelected: state.all[action.payload]
      };
    case UPDATE_NOTE_SELECTED:
      return {
        ...state,
        noteSelected: action.payload
      }
    case UPDATE_TAGS:
      const tag_name = action.payload;
      let newTags = [...state.tags];
      if (newTags.indexOf(tag_name) > -1) {
        newTags = newTags.filter( tag => tag !== tag_name );
      } else {
        newTags.push(tag_name);
      }
      return {
        ...state,
        tags: newTags
      }
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload
      }
    default:
      return state;
  }
}