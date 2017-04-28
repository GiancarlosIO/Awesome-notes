import { expect } from 'chai';
import * as Constants from '../../app/constants/';
import NotesReducer from '../../app/reducers/notes_reducer';

describe('note reducer', () => {
  const initialState = {
    all: {},
    noteSelected: null,
    tags: null,
    searchText: null,
    searchTag: null
  };
  it('should return the initial state', () => {
    expect(NotesReducer(undefined, {})).to.eql(initialState);
  });
  it('handle FETCH_NOTES', () => {
    expect(NotesReducer(initialState, {
      type: Constants.FETCH_NOTES,
      payload: {notes: {1: {id: 1, text: 'text test'}}, tags: ['tag1']}
    })).to.eql({
      ...initialState,
      all: {1: {id: 1, text: 'text test'}},
      tags: ['tag1']
    });
  })
  it('handle ADD_NOTE', () => {
    expect(NotesReducer(initialState, {
      type: Constants.ADD_NOTE,
      payload: { id: 1, text: 'text test' }
    })).to.eql({
      ...initialState,
      all: { 1:{ id: 1, text: 'text test'} }
    });
  });
  it('handle DELETE_NOTE', () => {
    expect(NotesReducer({
      ...initialState,
      all: { 1: {id: 1, text: 'test'} }
    },
    {
      type: Constants.DELETE_NOTE,
      payload: 1
    })).to.eql({
      ...initialState,
      all: {}
    });
  });
  it('handle UPDATE_NOTE', () => {
    expect(NotesReducer({
      ...initialState,
      all: { 1: {id: 1, text: 'test'} },
      noteSelected: { id: 1, text: 'test' }
    },
    {
      type: Constants.UPDATE_NOTE,
      payload: { id: 1, text: 'noteUpdated'}
    })).to.eql({
      ...initialState,
      all: { 1: {id: 1, text: 'noteUpdated'} },
      noteSelected: { id:1, text: 'noteUpdated' }
    });
  });
  it('handle SELECT_NOTE', () => {
    expect(NotesReducer({
      ...initialState,
      all: { 1: {id:1, text: 'test note'}}
    },
    {
      type: Constants.SELECT_NOTE,
      payload: 1
    })).to.eql({
      ...initialState,
      all: { 1: {id:1, text: 'test note'}},
      noteSelected: {id:1, text: 'test note'}
    });
  });
  it('handle UPDATE_NOTE_SELECTED', () => {
    expect(NotesReducer({
      ...initialState,
      noteSelected: { id:1, text: 'noteSelected' }
    },
    {
      type: Constants.UPDATE_NOTE_SELECTED,
      payload: { id: 1, text: 'text updated' }
    })).to.eql({
      ...initialState,
      noteSelected: {id: 1, text: 'text updated'}
    });
  });
  it('handle UPDATE_TAGS and add a new tag when its no exist', () => {
    expect(NotesReducer({
      ...initialState,
      tags: ['tag_1']
    },
    {
      type: Constants.UPDATE_TAGS,
      payload: 'tag_2'
    })).to.eql({
      ...initialState,
      tags: ['tag_1', 'tag_2']
    });
  });
  it('handle UPDATE_TAGS and no add the tag if it exists', () => {
    expect(NotesReducer({
      ...initialState,
      tags: ['tag_1']
    },
    {
      type: Constants.UPDATE_TAGS,
      payload: 'tag_1'
    })).to.eql({
      ...initialState,
      tags: ['tag_1']
    });
  });
  it('handle SET_SEARCH TEXT', () => {
    expect(NotesReducer(initialState, {
      type: Constants.SET_SEARCH_TEXT,
      payload: 'search text'
    })).to.eql({
      ...initialState,
      searchText: 'search text'
    });
  });
  it('handle SET_TAGS', () => {
    expect(NotesReducer(initialState, {
      type: Constants.SET_TAGS,
      payload: ['tag1', 'tag2']
    })).to.eql({
      ...initialState,
      tags: ['tag1', 'tag2']
    });
  });
  it('handle SELECT_TAG', () => {
    expect(NotesReducer(initialState, {
      type: Constants.SELECT_TAG,
      payload: 'tag1'
    })).to.eql({
      ...initialState,
      searchTag: 'tag1'
    });
  });
})