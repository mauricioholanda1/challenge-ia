import api from "../services/api";

const apikey = "8ae6a027";

export async function getMovies(texToSearch, page = 1) {
  const response = await api.get(
    `/?apikey=${apikey}&s=${texToSearch}&page=${page}`
  );
  return response.data;
}

export async function getMovieInfo(idMovie) {
  const response = await api.get(`/?apikey=${apikey}&i=${idMovie}`);
  return response.data;
}
