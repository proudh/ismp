import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = process.env.REACT_APP_API_HOST;

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  del: url =>
    superagent.del(`{API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
};

// Interacts with the /api/v1/school endpoint.
// params are of the form ?name=UCSD. While some of the names may have spaces, I've found that if you just copy paste
// the name (?name=University of California, San Diego) it will encode things for you even though it looks weird.
// Then in your component, you can
// import { schools } from 'utils/agent' and then
// schools.get_all().then( ... ) ;
export const schools = {
  get: params => requests.get('/api/v1/school/' + params),
  get_all: () => requests.get('/api/v1/school')
};

// Example
// const Comments = {
//   create: (slug, comment) =>
//     requests.post(`/articles/${slug}/comments`, { comment }),
//   delete: (slug, commentId) =>
//     requests.del(`/articles/${slug}/comments/${commentId}`),
//   forArticle: slug =>
//     requests.get(`/articles/${slug}/comments`)
// };

export default {
  setToken: _token => {
    token = _token;
  }
;
