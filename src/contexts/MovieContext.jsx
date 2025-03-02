import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);
export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);

    // Store favorites in local storage
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites)); // Parse the stored string back to an array
        }
    }, [])

    // Save favorites to local storage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Save the array as a string
    }, [favorites]);

    // Add a movie to favorites
    const addFavorite = (movie) => {
        setFavorites(prev => [...prev, movie]); // Add the movie to the array
    }

    // Remove a movie from favorites
    const removeFavorite = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId)); // Remove the movie from the array
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId); // Check if the movie is already in favorites
    }

    const value = {favorites, addFavorite, removeFavorite, isFavorite};

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}