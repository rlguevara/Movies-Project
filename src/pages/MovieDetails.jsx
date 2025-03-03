import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { useMovieContext } from '../contexts/MovieContext';
import '../css/MovieDetails.css';

function MovieDetails() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addFavorite, removeFavorite, isFavorite } = useMovieContext();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const data = await getMovieDetails(movieId);
                setMovie(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching movie details:', err);
                setError('Failed to load movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    const handleFavoriteClick = () => {
        if (isFavorite(movie.id)) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!movie) return <div className="error">Movie not found</div>;

    return (
        <div className="movie-details">
            <div className="movie-backdrop" style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            }}>
                <div className="backdrop-overlay"></div>
            </div>
            
            <div className="movie-content">
                <div className="movie-poster">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title} 
                    />
                    <button 
                        className={`favorite-btn ${isFavorite(movie.id) ? 'active' : ''}`}
                        onClick={handleFavoriteClick}
                    >
                        {isFavorite(movie.id) ? '❤️' : '🤍'}
                    </button>
                </div>

                <div className="movie-info">
                    <h1>{movie.title}</h1>
                    <div className="movie-meta">
                        <span className="release-date">
                            {new Date(movie.release_date).getFullYear()}
                        </span>
                        <span className="rating">
                            ⭐ {movie.vote_average.toFixed(1)}
                        </span>
                    </div>

                    <div className="genres">
                        {movie.genres.map(genre => (
                            <span key={genre.id} className="genre-tag">
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <div className="overview">
                        <h2>Overview</h2>
                        <p>{movie.overview}</p>
                    </div>

                    <div className="additional-info">
                        <div className="info-item">
                            <span className="label">Runtime:</span>
                            <span>{movie.runtime} minutes</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Original Language:</span>
                            <span>{movie.original_language.toUpperCase()}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">Status:</span>
                            <span>{movie.status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails; 