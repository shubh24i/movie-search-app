import React from 'react';
import MovieListItem from '../MovieList/MovieListItem/MovieListItem'
import styles from './Movies.module.css'

import Loader from './../Loader/Loader';

const MovieItems = ({ movieList, addToFavFunc, addToFav, isLoading }) => {

    let movies = <Loader />


    if (!isLoading) {
        movies = (movieList !== null && movieList !== undefined ? movieList.map((movie, i) => {
            return <MovieListItem addToFav={addToFav} addToFavFunc={addToFavFunc} key={i} movie={movie} />;
        }) : "No data found")
    }
    return (

        <div className={styles.userListArea}>

            <div className={[styles.pRL20, styles.Movielist].join(' ')}>
                {movies}
            </div>
        </div>

    );
}

export default MovieItems;