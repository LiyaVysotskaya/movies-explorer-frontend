export default class ApiMovies {
  constructor(settings) {
    this._url = settings.baseUrl;
    this._headers = settings.headers;
  }

  getMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
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

const apiMovies = new ApiMovies({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
})

export { apiMovies };
