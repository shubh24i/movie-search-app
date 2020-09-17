import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import Search from '../Search/Search';
import Movies from '../Movies/Movies';
import FavouriteMovies from '../FavouriteMovies/FavouriteMovies'

import 'react-toastify/dist/ReactToastify.css';

const MovieList = () => {

    const [movies, setMovies] = useState([]);
    const [addToFav, setAddToFav] = useState(localStorage.getItem("favMovie") !== null
        ? JSON.parse(localStorage.getItem("favMovie"))
        : null);
    const [isLoading, setIsloading] = useState(false);
    const [isError, setIsError] = useState('')

    const MOVIE_LIST_URL = `http://www.omdbapi.com/?apikey=eb1ef3fc`;

    const searchMovies = async (searchMovie, type) => {
        try {
            if (searchMovie) {
                setIsloading(true)
                let searchType = type ? `&type=${type}` : null;
                let searchUrl = `${MOVIE_LIST_URL}&s=${searchMovie}${searchType}`;
                let response = await fetch(searchUrl);
                let movies = await response.json(); // read response body and parse as JSON
                setMovies(movies.Search)
                setIsloading(false)
            } else {
                toast.error("Please enter search text", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                })
            }
        } catch (error) {
            setIsError(error)
            setIsloading(false)
        }
    }

    useEffect(() => {

        async function fetchMovies() {
            try {
                setIsloading(true)
                let response = await fetch(`${MOVIE_LIST_URL}&s=bat`);
                let movies = await response.json(); // read response body and parse as JSON
                setMovies(movies.Search)
                setIsloading(false)
            } catch (error) {
                setIsError(error)
                setIsloading(false)
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
            <Switch>
                <Route path="/" exact  ><Search searchMovies={searchMovies} /><Movies movieList={movies} addToFavFunc={addToFavHandler} isLoading={isLoading} isError={isError} addToFav={addToFav} /></Route>
                <Route path="/Favourites" exact><FavouriteMovies favMovieList={addToFav} /></Route>
            </Switch>
            <ToastContainer />
        </>
    );
}
export default MovieList;