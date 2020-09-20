import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom'

import Image from "../../../UI/Image";

import styles from "./MovieListItem.module.css";


const MovieListItem = ({ movie, addToFav, addToFavFunc, fav = true, history }) => {

  const [isFav, setIsFav] = useState(false)

  const isFavIdHndler = (movie) => {
    addToFavFunc(movie);
    if (addToFav !== null && addToFav !== undefined) {
      setIsFav(addToFav.filter((item) => (
        item.imdbID === movie.imdbID
      )))
    }
  }

  const onClickHandler = (id) => {
    history.push(`/movie/${id}`, { id: id })
  }

  useEffect(() => {
    if (addToFav !== null && addToFav !== undefined) {
      const isIdExist = addToFav.filter((item) => { return item.imdbID === movie.imdbID });
      isIdExist.length > 0 ? setIsFav(true) : setIsFav(false)
    }
  }, [movie.imdbID, addToFav])

  const imcSrc = (movie.Poster !== 'N/A') ? movie.Poster : require('../../../assests/images/place-holder.jpg');
  const favClass = !isFav ? styles.fav : styles.favFill

  return (
    <div className={styles.listItem}>
      <h3 onClick={() => onClickHandler(movie.imdbID)}>{movie.Title}</h3>
      <div className={styles.thumb} onClick={() => onClickHandler(movie.imdbID)}>
        {<Image source={imcSrc} altName={movie.Title} />}
      </div>
      <p className={[styles.dFlex, styles.pLR].join(' ')}>
        <span>Year: {movie.Year}</span>
        {fav && <span onClick={() => isFavIdHndler(movie)} className={favClass}></span>}
      </p>
      <p className={styles.pLR}> <span>Type: {movie.Type}</span></p>

    </div>
  );
};

export default withRouter(MovieListItem);
