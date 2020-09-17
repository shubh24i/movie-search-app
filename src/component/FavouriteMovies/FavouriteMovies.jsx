import React from 'react';
import MovieListItem from '../MovieList/MovieListItem/MovieListItem'
import styles from './FavouriteMovies.module.css'

const MovieItems = ({ favMovieList }) => {

    let fabMovies = (favMovieList !== null && favMovieList !== undefined) && favMovieList.map((movie, i) => {
        return <MovieListItem key={i} movie={movie} fav={false} />;
    });

    console.log('fabMovies', fabMovies);
    return (

        <div className={styles.movieListArea}>
            <div className={[styles.pRL20, styles.Movielist].join(' ')}>
                {fabMovies.lemgth > 0 ? fabMovies : <div className={styles.msg}>No data found</div>}
            </div>
        </div>

    );
}

export default MovieItems;