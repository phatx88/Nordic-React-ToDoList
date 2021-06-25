import axios from 'axios'
import config from '../utils/config.json';

export default function createAuthRequest() {
    const idToken = localStorage.getItem('idToken')
    return axios.create({
      baseURL: `${config.HEROKU_SERVER}/`,
      headers: {
        'Authorization': idToken?`Bearer ${idToken}`:null,
      },
    });
}
