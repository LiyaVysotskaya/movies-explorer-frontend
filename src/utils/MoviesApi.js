import { bitApiBaseUrl } from "./constants";

export default class ApiMovies {
  constructor(settings) {
    this._url = settings.baseUrl;
    this._headers = settings.headers;
  }

  getMoviesArray() {
    return fetch(`${this._url}`, {
      headers: this._headers,
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

const apiMovies = new ApiMovies({
  baseUrl: `${bitApiBaseUrl}/beatfilm-movies`,
  headers: {
    'Content-Type': 'application/json',
  }
})

export { apiMovies };
