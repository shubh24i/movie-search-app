import React, { useState, useEffect } from "react";

import Image from "../../../utill/Image";

import styles from "./MovieListItem.module.css";


const MovieListItem = ({ movie, addToFav, addToFavFunc, fav = true }) => {

  const [isFav, setIsFav] = useState(false)

  const isFavIdHndler = (movie) => {
    addToFavFunc(movie);
    setIsFav(addToFav.filter((item) => (
      item.imdbID === movie.imdbID
    )))
  }





  let favUrl = !isFav ? 'heart.svg' : 'heart_fill.svg'


  return (
    <div className={styles.listItem}>
      <h3>{movie.Title}</h3>
      <div className={styles.thumb}>
        <Image
          source={movie.Poster}
          altName="user"
        /></div>
      <p className={[styles.dFlex, styles.pLR].join(' ')}>
        <span>Year: {movie.Year}</span>
        {fav && <span><Image clicked={() => isFavIdHndler(movie)} classes={styles.fav} source={require(`../../../assests/images/${favUrl}`)} /></span>}
      </p>
      <p className={styles.pLR}> <span>Type: {movie.Type} - {movie.imdbID}</span></p>

    </div>
  );
};

export default MovieListItem;