// export const BASE_URL = "http://127.0.0.1:3001";
export const BASE_URL = "https://api.barkhatos-movies.nomoredomainsmonster.ru";

const onResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(onResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(onResponse)
    .then((data) => {
      if (data) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return;
      }
    });
};

export const getProfile = () => {
  const token = `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then(onResponse);
};

export const updateProfile = (name, email) => {
  const token = `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  }).then(onResponse);
};

export const addMovie = (movie) => {
  const token = `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  }).then(onResponse);
};

export const getSavedMovies = () => {
  const token = `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${BASE_URL}/movies`, {
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then(onResponse);
};

export const removeSavedMovie = (id) => {
  const token = `Bearer ${localStorage.getItem("token")}`;
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  }).then(onResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(onResponse);
};
