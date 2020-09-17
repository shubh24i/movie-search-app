import React from "react";

import Header from '../component/Header/Header';
import MovieList from '../component/MovieList/MovieList'
import styles from './App.module.css'
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div className={styles.mainWrapper}>
        <>
          <Header />
          <MovieList />
        </>
      </div>

    </BrowserRouter>
  );
}

export default App;
