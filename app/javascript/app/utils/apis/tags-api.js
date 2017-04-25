import axios from 'axios';
import { env } from 'process';

import {
  getAuthApiHeaderConfig
} from './header-config';

const BASE_URL = env.NODE_ENV === 'test' ? 'http://localhost:3000/api/v1/tags' : '/api/v1/tags';

// first get headerValues to send in request

const TagAPI = {
  updateTag: (tag_name, note_id) => {
    let CancelToken = axios.CancelToken;
    let cancel;
    let request = axios({
      method: 'post',
      headers: getAuthApiHeaderConfig(),
      url: BASE_URL,
      responseType: 'json',
      data: { tag: { note_id, tag_name } },
      cancelToken: new CancelToken(c => cancel = c)
    })
    return { request, axios };
  }
}

export default TagAPI;