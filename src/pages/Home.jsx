import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies, getMovieGenres, searchMoviesByGenre } from "../services/api";
import MovieCard from "../components/MovieCard";
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Fetch genres
                const movieGenres = await getMovieGenres();
                setGenres(movieGenres);
                
                // Fetch popular movies
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.log('Error fetching initial data:', err);
                setError('Failed to load initial data');
            }
            finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {
            let searchResults;
            
            // If a genre is selected, use the genre search
            if (selectedGenre) {
                searchResults = await searchMoviesByGenre(searchQuery, selectedGenre);
            } else if (searchQuery.trim()) {
                // If only search query is provided
                searchResults = await searchMovies(searchQuery);
            } else {
                // If neither genre nor query, get popular movies
                searchResults = await getPopularMovies();
            }
            
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies...");
        }
        finally {
            setLoading(false);
        }
    };

    const handleGenreChange = async (e) => {
        const genreId = e.target.value;
        setSelectedGenre(genreId);
        
        if (loading) return;
        
        setLoading(true);
        try {
            let results;
            
            // If "All Genres" is selected (empty string)
            if (!genreId) {
                // Load popular movies
                results = await getPopularMovies();
            } else {
                // If a specific genre is selected
                results = await searchMoviesByGenre(searchQuery, genreId);
            }
            
            setMovies(results);
            setError(null);
        } catch (err) {
            console.log(err);
            setError("Failed to search movies by genre");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    className="search-input"
                    placeholder="Search for movies..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
                
                <select 
                    className="genre-select"
                    value={selectedGenre}
                    onChange={handleGenreChange}
                >
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
                
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    ) : (
                        <div className="no-results">No movies found</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home