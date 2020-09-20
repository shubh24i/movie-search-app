import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css'

const Navigation = () => {
    return (<div className={styles.nav}>
        <NavLink to="/" exact activeClassName={styles.active}>Home</NavLink>
        <NavLink to="/favourites" activeClassName={styles.active}>Favourites</NavLink>
    </div>);
}

export default Navigation;