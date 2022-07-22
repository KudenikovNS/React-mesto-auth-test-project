export class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._requestResult(res));
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._requestResult(res));
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._requestResult(res));
  }

  deleteConfirmCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      credentials: 'include',
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }

  addLikes(id, set) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      credentials: 'include',
      method: set ? "DELETE" : "PUT",
      headers: this._headers,
    }).then((res) => this._requestResult(res));
  }
}

export const api = new Api({
  baseUrl: "http://api.kudenikovns.students.nomoredomains.xyz",
  headers: {
    "Content-type": "application/json",
  },
});
