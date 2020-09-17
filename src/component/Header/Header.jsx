import React from 'react';

import Navigation from './../Navigation/Navigation';

import styles from './Header.module.css'

const Header = () => {
    return (<div className={styles.header}>
        <h1>IMDB Movies</h1>
        <Navigation /></div>);
}

export default Header;