import BaseService from './BaseService';

class AuthService extends BaseService {
  constructor() {
    super('/auth');
  }

  login({ username, password }) {
    return this.request({
      method: 'POST',
      url: `${this.url}/login`,
      data: {
        username,
        password,
      },
      noAuth: true,
    }).then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  fetchConnectionToken() {
    return this.request({
      method: 'GET',
      url: `${this.url}/hubtoken`,
      noAuth: true,
    }).then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  signup({ username, password, name }) {
    return this.request({
      method: 'POST',
      url: `${this.url}/signup`,
      data: { username, password, name },
      noAuth: true,
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }

  logout() {
    return this.request({
      method: 'POST',
      url: `${this.url}/logout`,
      data: {},
    })
      .then((res) => Promise.resolve(res))
      .catch((err) => Promise.reject(err));
  }
}

const authService = new AuthService();
export default authService;