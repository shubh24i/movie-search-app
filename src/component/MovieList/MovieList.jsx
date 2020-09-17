import React, { useEffect, useState } from 'react';

import styles from './MovieList.module.css'
import Search from '../Search/Search';
import { Route, Switch } from "react-router-dom";
import Movies from '../Movies/Movies';
import FavouriteMovies from '../FavouriteMovies/FavouriteMovies'

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [addToFav, setAddToFav] = useState(localStorage.getItem("favMovie") !== null
        ? JSON.parse(localStorage.getItem("favMovie"))
        : null)
    const MOVIE_LIST_URL = `http://www.omdbapi.com/?apikey=eb1ef3fc`;
    const [isLoading, setIsloading] = useState(false)

    const searchMovies = async (searchMovie, type) => {
        if (searchMovie) {
            let searchType = type ? `&type=${type}` : null;
            let searchUrl = `${MOVIE_LIST_URL}&s=${searchMovie}${searchType}`;
            let response = await fetch(searchUrl);
            let movies = await response.json(); // read response body and parse as JSON
            setMovies(movies.Search)
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
                console.log(error)
                setIsloading(false)
            }

        };
        fetchMovies();
    }, [MOVIE_LIST_URL])


    const addToFavHandler = (id) => {

        var store = JSON.parse(localStorage.getItem("favMovie") || '[]');
        store.push(id);
        localStorage.setItem("favMovie", JSON.stringify(store));

        setAddToFav((prevState) => ([
            ...prevState,
            id,
        ]));

    };


    return (
        <>

            <Switch>
                <Route path="/" exact  ><Search searchMovies={searchMovies} /><Movies movieList={movies} addToFavFunc={addToFavHandler} isLoading={isLoading} addToFav={addToFav} /></Route>
                <Route path="/Favourites" exact><FavouriteMovies movieIdList={addToFav} /></Route>
            </Switch>

        </>);
}

export default MovieList;