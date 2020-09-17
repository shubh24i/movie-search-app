import React from 'react';
import MovieListItem from '../MovieList/MovieListItem/MovieListItem'
import styles from './FavouriteMovies.module.css'

const MovieItems = ({ favMovieList }) => {

    let fabMovies = '';

    if (favMovieList !== null && favMovieList.length > 0 && favMovieList !== undefined) {
        fabMovies = favMovieList.map((movie, i) => {
            return <MovieListItem key={i} movie={movie} fav={false} />;
        })
    } else {
        fabMovies = (<div className={styles.msg}>No data found</div>)
    };

    return (

        <div className={styles.movieListArea}>
            <div className={[styles.pRL20, styles.Movielist].join(' ')}>
                {fabMovies}
            </div>
        </div>

    );
}

export default MovieItems;