import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../moviesApi';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const castData = await getMovieCredits(movieId);
        setCast(castData);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h3>Cast</h3>
      <ul className={styles.castList}>
        {cast.map(member => (
          <li key={member.id} className={styles.castItem}>
            <p>{member.name} as {member.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
