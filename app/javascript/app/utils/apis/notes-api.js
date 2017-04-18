import axios from 'axios';
import { env } from 'process';

import {
  getAuthApiHeaderConfig
} from './header-config';

const BASE_URL = env.NODE_ENV === 'test' ? 'http://localhost:3000/api/v1/notes' : '/api/v1/notes';

// first get headerValues to send in request

const NotesAPI = {
  fetchNotes: () => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request = axios({
      method: 'get',
      headers: getAuthApiHeaderConfig(),
      url: BASE_URL,
      responseType: 'json',
      cancelToken: new CancelToken( c => cancel = c)
    });
    return { request, cancel };
  },
  addNote: (text) => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request = axios({
      method: 'post',
      headers: getAuthApiHeaderConfig(),
      url: BASE_URL,
      data: {note: { text }},
      responseType: 'json',
      cancelToken: new CancelToken( c => cancel = c )
    });
    return { request, cancel };
  },
  updateNote: (noteId, text) => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request = axios({
      method: 'put',
      headers: getAuthApiHeaderConfig(),
      responseType: 'json',
      url: `${BASE_URL}/${noteId}`,
      data: { note: { text } },
      cancelToken: new CancelToken( c => cancel = c )
    });
    return { request, cancel };
  },
  deleteNote: (noteId) => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request = axios({
      method: 'delete',
      headers: getAuthApiHeaderConfig(),
      url: `${BASE_URL}/${noteId}`,
      responseType: 'json',
      cancel: new CancelToken( c => cancel = c )
    });
    return { request, cancel };
  }
}


export default NotesAPI;