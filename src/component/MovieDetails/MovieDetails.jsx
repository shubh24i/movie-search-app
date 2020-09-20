import React, { useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom'

import Image from '../../UI/Image'
import Loader from '../../UI/Loader/Loader';

import styles from './MovieDetails.module.css'

const intialState = {
    movie: {},
    loading: true,
    errorMessage: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "MOVIE_SHOW_REQUEST":
            return {
                ...state,
                loading: true,
                errorMessage: null
            }
        case "MOVIE_SHOW_SUCCESS":
            return {
                ...state,
                movie: action.payload,
                loading: false
            }
        case "MOVIE_SHOW_ERROR":
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state
    }
}
const MovieDetails = () => {

    const [state, dispatch] = useReducer(reducer, intialState)
    const { movie, errorMessage, loading } = state;
    const location = useLocation()
    const id = location.state.id;

    useEffect(() => {
        try {
            async function movie(id) {
                const response = await fetch(`http://www.omdbapi.com/?apikey=eb1ef3fc&i=${id}`);
                const result = await response.json();
                dispatch({
                    type: "MOVIE_SHOW_SUCCESS",
                    payload: result
                })
            }
            if (id) {
                movie(id);
            }
        } catch (error) {
            dispatch({
                type: "MOVIE_SHOW_ERROR",
                error: error
            })
        }
    }, [id])

    let movieDetails = errorMessage ? errorMessage : loading ? <Loader /> : <>
        <div className={styles.poster}><div className={styles.imgWrapper}><Image source={movie.Poster} /></div> </div>
        <div className={styles.details}>
            <h2>{movie.Title}</h2>
            <p>Type : {movie.Type}</p>
            <p>{movie.Plot}</p>
            <p><span>Language : </span>{movie.Language} | <span>Released Date :</span> {movie.Released}</p>
            <p><span>Rating :</span> {movie.imdbRating} | <span>Rated : </span>{movie.Rated} </p>
            <ul>
                <li><span>Movie Category : </span>{movie.Genre}</li>
                <li><span>Stars : </span> {movie.Actors}</li>
                <li><span>Directed by : </span> {movie.Director}</li>
                <li><span>Writer : </span> {movie.Writer}</li>
            </ul>
        </div>
    </>


    return (

        <div className={styles.movieWrapper}>
            {movieDetails}
        </div>);
}

export default MovieDetails;