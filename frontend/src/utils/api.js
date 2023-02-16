class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
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
    const token = localStorage.getItem('token');
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }


  getUserInfo() {
    const token = localStorage.getItem('token');
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  editProfile(data) {
    const token = localStorage.getItem('token');
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  getNewCard({ name, link }) {
    const token = localStorage.getItem('token');
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  putLike(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  deleteLike(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.putLike(cardId) : this.deleteLike(cardId);
  }

  editAvatar(data) {
    const token = localStorage.getItem('token');
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  // headers: {
  //   authorization: '3ed071d5-3447-4bf6-9405-efffbed59fce',
  //   'Content-Type': 'application/json'
  // }
});

export default api;