import { expect } from 'chai';
import {
  getFilteredNotes,
  getFilteredNotesByTag
} from '../../app/selectors/';
import NotesReducer from '../../app/reducers/notes_reducer';

describe('selectors', () => {
  const initialState = {
    notes: {
      all: {
        1:{
          id:1 ,
          text:'text test',
          tags: ['tag1', 'tag3']
        },
        2:{
          id: 2,
          text: 'text false',
          tags: ['tag2']
        }
      },
      noteSelected: null,
      tags: null,
      searchText: null,
      searchTag: null
    }
  };
  describe('getFilteredNotes by search text Selector', () => {
    afterEach(() => {
      getFilteredNotes.resetRecomputations();
    });
    it('filter the notes by search Text', () => {
      const state = {
        ...initialState,
        notes: {
          ...initialState.notes,
          searchText: 'test'
        }
      }
      expect(getFilteredNotes(state)).to.eql({
        1: {
          id:1 ,
          text:'text test',
          tags: ['tag1', 'tag3']
        }
      });
    });
    it('return a empty object if search text not match', () => {
      const state = {
        ...initialState,
        notes: {
          ...initialState.notes,
          searchText: 'test2'
        }
      };
      expect(getFilteredNotes(state)).to.eql({});
    });
    it('call only one time if the filtered notes is the same', () => {
      const state = {
        ...initialState,
        notes: {
          ...initialState.notes,
          searchText: 'test'
        }
      };
      getFilteredNotes(state);
      getFilteredNotes(state);
      expect(getFilteredNotes.recomputations()).to.eql(1);
    });
  });
  describe('getFilteredNotes by search Tag selector', () => {
    afterEach(() => {
      getFilteredNotesByTag.resetRecomputations();
    });
    it('filter the notes by tagName', () => {
      const state = {
        ...initialState,
        notes: {
          ...initialState.notes,
          searchTag: 'tag2'
        }
      };
      expect(getFilteredNotesByTag(state)).to.eql({
        2: {
          id: 2,
          text: 'text false',
          tags: ['tag2']
        }
      });
    });
    it('filter the notes first by search text and then by search tag', () => {
      const state = {
        ...initialState,
        notes: {
          ...initialState.notes,
          searchText: 'false',
          searchTag: 'tag2'
        }
      };
      expect(getFilteredNotesByTag(state)).to.eql({
        2:{
          id: 2,
          text: 'text false',
          tags: ['tag2']
        }
      });
    })
    it('return a empty object if the tag no match', () => {
      const state = {
        ...initialState,
        notes: {
          ...initialState.notes,
          searchText: 'test',
          searchTag: 'tag2'
        }
      };
      expect(getFilteredNotesByTag(state)).to.eql({});
    });
    it('just call one time the selector if the result is the same', () => {
      const state = {
        ...initialState,
        notes: {
          ...initialState.notes,
          searchText: 'test1',
          searchTag: 'tag2'
        }
      };
      getFilteredNotesByTag(state);
      getFilteredNotesByTag(state);
      expect(getFilteredNotesByTag.recomputations()).to.eql(1);
    })
  })
});