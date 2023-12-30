export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

const onResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getMovies = () => {
  return fetch(BASE_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(onResponse);
};
