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

  getMoviesArray() {
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

  addNewMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        owner: data.owner,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN
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

  changeLikeStatus(id, likeStatus) {
    let method = 'DELETE';
    if (likeStatus) {
      method = 'PUT';
    }

    return fetch(`${this._url}/movies/${id}/likes`, {
      method: method,
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
  baseUrl: 'https://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export { apiMain };
