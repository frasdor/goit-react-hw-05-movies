import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../../moviesApi';
import GoBackButton from '../GoBackButton/GoBackButton';
import styles from './Movies.module.css';


const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };


  return (
    <div className={styles.container}>
   <GoBackButton />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>
      <ul className={styles.movieList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieItem}>
            <Link to={`/movies/${movie.id}`}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.moviePoster}
                />
              ) : (
                <div className={styles.noImage}>No Image Available</div>
              )}
              <h3>{movie.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
