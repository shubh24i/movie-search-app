import React, { useState, useEffect } from "react";

import Image from "../../../utill/Image";

import styles from "./MovieListItem.module.css";


const MovieListItem = ({ movie, addToFav, addToFavFunc, fav = true }) => {

  const [isFav, setIsFav] = useState(false)

  const isFavIdHndler = (movie) => {
    addToFavFunc(movie);
    if (addToFav !== null && addToFav !== undefined) {
      setIsFav(addToFav.filter((item) => (
        item.imdbID === movie.imdbID
      )))
    }
  }

  useEffect(() => {
    if (addToFav !== null && addToFav !== undefined) {
      let isIdExist = addToFav.filter((item) => { return item.imdbID === movie.imdbID });
      isIdExist.length > 0 ? setIsFav(true) : setIsFav(false)
    }
  }, [movie.imdbID, addToFav])

  let imcSrc = (movie.Poster !== 'N/A') ? movie.Poster : require('../../../assests/images/place-holder.jpg');
  let favClass = !isFav ? styles.fav : styles.favFill

  return (
    <div className={styles.listItem}>
      <h3>{movie.Title}</h3>
      <div className={styles.thumb}>
        {<Image source={imcSrc} altName={movie.Title} />}
      </div>
      <p className={[styles.dFlex, styles.pLR].join(' ')}>
        <span>Year: {movie.Year}</span>
        {fav && <span onClick={() => isFavIdHndler(movie)} className={favClass}></span>}
      </p>
      <p className={styles.pLR}> <span>Type: {movie.Type} - {movie.imdbID}</span></p>

    </div>
  );
};

export default MovieListItem;
