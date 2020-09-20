import React, { useEffect, useState, useReducer } from 'react';
import { Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import Search from '../Search/Search';
import Movies from '../Movies/Movies';
import MovieDetails from '../MovieDetails/MovieDetails';

import 'react-toastify/dist/ReactToastify.css';

const intialState = {
    movies: [],
    loading: true,
    errorMessage: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_MOVIE_REQUEST":
            return {
                ...state,
                loading: true,
                errorMessage: null
            }
        case "SEARCH_MOVIE_SUCCESS":
            return {
                ...state,
                loading: false,
                movies: action.payload,
            }
        case "SEARCH_MOVIE_ERROR":
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            }
        default:
            return state
    }
}

const MovieList = (history) => {

    const [addToFav, setAddToFav] = useState(localStorage.getItem("favMovie") !== null
        ? JSON.parse(localStorage.getItem("favMovie"))
        : null);
    const [state, dispatch] = useReducer(reducer, intialState);
    const { movies, loading, errorMessage } = state;
    const MOVIE_LIST_URL = `http://www.omdbapi.com/?apikey=eb1ef3fc`;

    const searchMovies = async (searchMovie, type) => {
        try {
            if (searchMovie) {
                dispatch({
                    type: 'SEARCH_MOVIE_REQUEST',
                })
                let searchType = type ? `&type=${type}` : '';
                let searchUrl = `${MOVIE_LIST_URL}&s=${searchMovie}${searchType}`;
                let response = await fetch(searchUrl);
                let movies = await response.json(); // read response body and parse as JSON
                dispatch({
                    type: 'SEARCH_MOVIE_SUCCESS',
                    payload: movies.Search
                })

            } else {
                toast.error("Please enter search text", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                })
            }

        } catch (error) {
            dispatch({
                type: 'SEARCH_MOVIE_ERROR',
                error: error
            })
        }
    }

    useEffect(() => {

        async function fetchMovies() {
            try {

                let response = await fetch(`${MOVIE_LIST_URL}&s=bat`);
                let movies = await response.json(); // read response body and parse as JSON
                dispatch({
                    type: 'SEARCH_MOVIE_SUCCESS',
                    payload: movies.Search
                })

            } catch (error) {
                dispatch({
                    type: 'SEARCH_MOVIE_ERROR',
                    error: error
                })

            }

        };
        fetchMovies();
    }, [MOVIE_LIST_URL])


    const addToFavHandler = (movie) => {
        let favMovie;

        var store = JSON.parse(localStorage.getItem("favMovie") || '[]');

        if (store === undefined || store === null) {
            localStorage.setItem("favMovie", JSON.stringify([movie]));
        }
        let isMovieExist = store.filter((item) => { return item.imdbID === movie.imdbID });
        if (isMovieExist.length > 0 && store !== null) {
            favMovie = store.filter((item) => { return item.imdbID !== movie.imdbID });
            localStorage.setItem("favMovie", JSON.stringify(favMovie));
            setAddToFav(favMovie)
        } else {
            store.push(movie);
            localStorage.setItem("favMovie", JSON.stringify(store));
            if (addToFav !== null) {
                setAddToFav((prevState) => ([
                    ...prevState,
                    movie,
                ]))
            } else {
                setAddToFav([movie]);
            };
        }

    };

    return (
        <>
            <Search searchMovies={searchMovies} />
            <Switch>
                <Route path="/" exact  ><Movies movieList={movies} addToFavFunc={addToFavHandler} isLoading={loading} isError={errorMessage} addToFav={addToFav} /></Route>
                <Route path="/favourites" ><Movies movieList={addToFav} addToFavFunc={addToFavHandler} isLoading={loading} isError={errorMessage} addToFav={addToFav} /></Route>
                <Route path="/movie/:id" ><MovieDetails /></Route>
            </Switch>
            <ToastContainer />
        </>
    );
}
export default MovieList;