import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import noteReducer from './notes_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  notes: noteReducer
});

export default rootReducer;