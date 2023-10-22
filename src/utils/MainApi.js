import { bitApiBaseUrl } from "./constants";

export default class ApiMain {
  constructor(settings) {
    this._url = settings.baseUrl;
    this._headers = settings.headers;
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
      credentials: 'include'
    })
      .then(this._checkResponse);
  }

  editProfileInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        email: data.email,
      }),
      credentials: 'include'
    })
    .then(this._checkResponse);
  }

  saveMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        ...data,
        movieId: data.id,
      }),
      credentials: 'include'
    })
    .then(this._checkResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._checkResponse);
  }

  register(username, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password
      }),
      credentials: 'include'
    })
    .then(this._checkResponse);
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
      credentials: 'include'
    })
    .then(this._checkResponse)
  }

  logout() {
    return fetch(`${this._url}/signout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
    .then(this._checkResponse);
  };

  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

const apiMain = new ApiMain({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
})

export { apiMain };
