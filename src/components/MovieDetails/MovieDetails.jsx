import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../moviesApi';
import GoBackButton from '../GoBackButton/GoBackButton';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className={styles.container}>
      <GoBackButton />
      <h2>{movie.title}</h2>
      {movie.poster_path && (
        <img src={posterUrl} alt={movie.title} className={styles.poster} />
      )}
      <h3>Overview</h3>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>

      <h3>Genres</h3>
      {movie.genres && movie.genres.length > 0 ? (
        <ul>
          {movie.genres.map(genre => (
            <li className={styles.genresLi} key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      ) : (
        <p>No genres available.</p>
      )}

      <h3>Additional Information</h3>
      <ul className={styles.additionalInfoList}>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetails;
