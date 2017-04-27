import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'enzyme';
import * as Constans from '../../app/constants/';
import * as Actions from '../../app/actions/notes';
import configureMockStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import nock from 'nock';
import NoteAPI from '../../app/utils/apis/notes-api';
import TagAPI from '../../app/utils/apis/tags-api';

describe('note actions', () => {
  describe('sync', () => {
    it('should create a action of type fetchNotes', () => {
      const notes = {1: {id: 1, text: 'note1'}};
      const expectedAction = {
        type: Constans.FETCH_NOTES,
        payload: notes
      };
      expect(Actions.fetchNotes(notes)).to.eql(expectedAction);
    });
    it('should create an action of type ADD_NOTE', () => {
      const note = {id: 1, text: 'text test'};
      const expectedAction = {
        type: Constans.ADD_NOTE,
        payload: note
      };
      expect(Actions.addNote(note)).to.eql(expectedAction);
    });
    it('should create an action of type DELETE_NOTE', () => {
      const noteId = 2;
      const expectedAction = {
        type: Constans.DELETE_NOTE,
        payload: noteId
      };
      expect(Actions.deleteNote(noteId)).to.eql(expectedAction);
    });
    it('should create an action of type UPDATE_NOTE', () => {
      const note = { id: 2, text: 'test text' };
      const expectedAction = {
        type: Constans.UPDATE_NOTE,
        payload: note
      };
      expect(Actions.updateNote(note)).to.eql(expectedAction);
    });
    it('should create an action of type SELECT_NOTE', () => {
      const noteId = 2;
      const expectedAction = {
        type: Constans.SELECT_NOTE,
        payload: noteId
      };
      expect(Actions.selectNote(noteId)).to.eql(expectedAction);
    });
    it('should create an action of type SET_SEARCH_TEXT', () => {
      const text = 'text';
      const expectedAction = {
        type: Constans.SET_SEARCH_TEXT,
        payload: text
      };
      expect(Actions.setSearchText(text)).to.eql(expectedAction);
    });
    it('should create an action of type UPDATE_NOTE_SELECTED', () => {
      const note = { id: 3, text: 'test text' };
      const expectedAction = {
        type: Constans.UPDATE_NOTE_SELECTED,
        payload: note
      };
      expect(Actions.updateNoteSelected(note)).to.eql(expectedAction);
    });
    it('should create an action of type UPDATE_TAGS', () => {
      const tagName = 'tag_1';
      const expectedAction = {
        type: Constans.UPDATE_TAGS,
        payload: tagName
      };
      expect(Actions.updateTags(tagName)).to.eql(expectedAction);
    });
    it('should create an action of type SET_TAGS', () => {
      const tags = ['tag1', 'tag2'];
      const expectedAction = {
        type: Constans.SET_TAGS,
        payload: tags
      };
      expect(Actions.setTags(tags)).to.eql(expectedAction);
    });
    it('should create an action of type SELECT_TAG', () => {
      const tag = 'tag_1';
      const expectedAction = {
        type: Constans.SELECT_TAG,
        payload: tag
      };
      expect(Actions.selectTag(tag)).to.eql(expectedAction);
    });
  });
  describe('asyn', () => {
    const initialState = {
      all: {},
      noteSelected: null,
      tags: null,
      searchText: null,
      searchTag: null
    }
    afterEach(() => {
      nock.cleanAll();
    })
    it('create two actions of type SELECT_NOTE and FETCH_NOTES after fetchNotesApi is complete', () => {
      const notes =  [{id: 1, text:'text1'}, {id:2, text: 'text2'}];
      const tags = ['tag1', 'tag2'];
      nock('http://localhost:3000')
        .get('/api/v1/notes')
        .reply(200, {
          notes: notes,
          tags: tags
        });
      let objNotes = {};
      notes.forEach( note => objNotes[`${note.id}`] = note );
      const lastNote = objNotes[Object.keys(objNotes)[0]];
      const expectedActions = [
        { type: Constans.FETCH_NOTES, payload:  {notes: objNotes, tags}},
        { type: Constans.SELECT_NOTE, payload:  lastNote.id}
      ];
      const middlewares = [ ReduxThunk.withExtraArgument({NoteAPI}) ];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore({notes: initialState});
      return store.dispatch(Actions.fetchNotesFromApi())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('create two actions of type ADD_NOTE and SELECT_NOTE after addNoteFromAPi is complete', () => {
      const note = { id: 1, text: 'text example' };
      nock('http://localhost:3000')
        .post('/api/v1/notes')
        .reply(200, {
          note: note
        });
      const expectedActions = [
        { type: Constans.ADD_NOTE, payload: note },
        { type: Constans.SELECT_NOTE, payload: note.id }
      ];
      const middlewares = [ ReduxThunk.withExtraArgument({NoteAPI}) ];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore({notes: initialState});
      return store.dispatch(Actions.addNoteFromApi('text example'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('create one action of type UPDATE_NOTE when updateNoteFromApi is complete', () => {
      const noteId = 1;
      const text = 'text example';
      const newInitialState = {
        ...initialState,
        all: {1: { id: 1, text: 'text' }},
        noteSelected: { id: 1, text: 'text' }
      }
      nock('http://localhost:3000')
        .put('/api/v1/notes/1')
        .reply(200, {
          note: { id: 1, text: 'text example'}
        });
      const expectedActions = [
        { type: Constans.UPDATE_NOTE, payload: {id: 1, text: 'text example'} }
      ];
      const middlewares = [ReduxThunk.withExtraArgument({NoteAPI})];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore({notes: newInitialState});
      return store.dispatch(Actions.updateNoteFromApi(noteId, text))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('create three actions of type SELECT_NOTE, DELETE_NOTE and SET_TAGS when deleteNoteFromAPi is complete', () => {
      const note = {
        id: 3,
        text: 'text example'
      };
      const newInitialState = {
        ...initialState,
        noteSelected: note,
        all: { 3: note }
      };
      const tags = ['tag1', 'tag2'];
      nock('http://localhost:3000')
        .delete('/api/v1/notes/3')
        .reply(200, { tags });
      const expectedAction = [
        { type: Constans.SELECT_NOTE, payload: null },
        { type: Constans.DELETE_NOTE, payload: note.id },
        { type: Constans.SET_TAGS, payload: tags}
      ];
      const middlewares = [ ReduxThunk.withExtraArgument({NoteAPI}) ];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore({notes: newInitialState});
      return store.dispatch(Actions.deleteNoteFromApi(note.id))
        .then(() => {
          expect(store.getActions()).to.eql(expectedAction);
        })
    });
    it('create two actions of type UPDATE_NOTE and UPDATE_TAGS when updateTag is complete', () => {
      const note = {
        id: 1,
        text: 'text example',
        tags: ['tag1']
      }
      nock('http://localhost:3000')
        .post('/api/v1/tags', {
          tag: { note_id: 1, tag_name: 'tag2' }
        })
        .reply(200, {
          note: {
            id: 1,
            text: 'text example',
            tags: [ 'tag1', 'tag2' ]}
        });
      const expectedActions = [
        { type: Constans.UPDATE_NOTE, payload:  {...note, tags: ['tag1', 'tag2']}},
        { type: Constans.UPDATE_TAGS, payload: 'tag2' }
      ];
      const middlewares = [ ReduxThunk.withExtraArgument({TagAPI}) ];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore({notes: initialState});
      return store.dispatch(Actions.updateTag('tag2', 1))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
})