import React, { useState } from 'react';
import styles from './Search.module.css'

const Search = ({ searchMovies }) => {

    const [userSearch, setUserSearch] = useState('');
    const [type, setType] = useState([]);

    const onSelectHandler = (e) => {
        let searchstr = e.currentTarget.value;
        setType(searchstr);
    }

    const onSearchHandler = (e, searchStr, url) => {
        e.preventDefault();
        searchMovies(searchStr, type);
    }


    const onChangeHandler = (e) => {
        let searchstr = e.currentTarget.value;
        setUserSearch(searchstr);
    }


    return (<form
        className={styles.search}
    >
        <input name="userSearch" onChange={(e) => onChangeHandler(e)} value={userSearch} type="text" placeholder="Search" />
        <select onChange={onSelectHandler}>
            <option value="">All</option>
            <option value="movie" > Movies</option>
            <option value="series">Series</option>
            <option value="episode">Episodes</option>
        </select>
        <button onClick={(e) => onSearchHandler(e, userSearch)} >Search</button>
    </form>);
}

export default Search;