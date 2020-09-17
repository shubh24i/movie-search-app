import React, { useState } from 'react';
import MovieListItem from '../MovieList/MovieListItem/MovieListItem'
import styles from './FavouriteMovies.module.css'

const MovieItems = ({ movieIdList }) => {
    console.log(movieIdList)


    return (

        <div className={styles.movieListArea}>

            <div className={[styles.pRL20, styles.Movielist].join(' ')}>
                {movieIdList !== null && movieIdList !== undefined ? movieIdList.map((movie, i) => {
                    return <MovieListItem key={i} movie={movie} fav={false} />;
                }) : "No data found"}
            </div>
        </div>

    );
}

export default MovieItems;