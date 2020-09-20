import React from 'react';
import MovieListItem from '../MovieList/MovieListItem/MovieListItem'

import Loader from '../../UI/Loader/Loader';

import styles from './Movies.module.css'

const Movies = ({ movieList, addToFavFunc, addToFav, isLoading, isError }) => {



    let movies = isError ? isError : isLoading ? <Loader /> : (movieList !== null && movieList !== undefined ? movieList.map((movie, i) => {
        return <MovieListItem addToFav={addToFav} addToFavFunc={addToFavFunc} key={i} movie={movie} />;
    }) : <div className={styles.msg}>No data found</div>)

    return (
        <div className={styles.userListArea}>

            <div className={[styles.pRL20, styles.Movielist].join(' ')}>
                {movies}
            </div>
        </div>
    );
}

export default Movies;