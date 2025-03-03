import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { useNavigate } from "react-router-dom"

function MovieCard({ movie }) {
    const {addFavorite, removeFavorite, isFavorite} = useMovieContext();
    const favorite = isFavorite(movie.id);
    const navigate = useNavigate();

    function onFavoriteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    }

    const handleClick = () => {
        navigate(`/movie/${movie.id}`);
    };

    return (
        <div className="movie-card" onClick={handleClick}>
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>❤︎</button>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split('-')[0]}</p>
            </div>
        </div>
    )
}

export default MovieCard