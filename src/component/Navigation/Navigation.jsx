import React from 'react';
import styles from './Navigation.module.css'
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (<div className={styles.nav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Favourites">Favourites</NavLink>
    </div>);
}

export default Navigation;