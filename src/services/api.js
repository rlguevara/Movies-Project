const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}

export const getMovieGenres = async () => {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();
    return data.genres;
}

export const searchMoviesByGenre = async (query, genreId) => {
    let url = `${BASE_URL}/search/movie?api_key=${API_KEY}`;
    
    if (query && query.trim() !== '') {
        url += `&query=${encodeURIComponent(query)}`;
    } else {
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;
    }
    
    if (genreId) {
        url += `&with_genres=${genreId}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

export const getMovieDetails = async (movieId) => {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
}