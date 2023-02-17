class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleResponse)
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this.headers
    })
  }


  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this.headers
    })
  }

  editProfile({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name, about })
    })
  }

  getNewCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  putLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
  }

  deleteLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.putLike(cardId) : this.deleteLike(cardId);
  }

  editAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

export default api;