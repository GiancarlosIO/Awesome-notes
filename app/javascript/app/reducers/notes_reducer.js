import {
  FETCH_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  SELECT_NOTE
} from '../constants/';

const initialState = {
  all: {},
  noteSelected: {},
  tags: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTES:
      return {
        ...state,
        all: action.payload
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
        }
      };
    case SELECT_NOTE:
      return {
        ...state,
        noteSelected: state.all[action.payload]
      };
    default:
      return state;
  }
}