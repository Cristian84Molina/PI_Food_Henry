import React from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';
import style from './navSearch.module.css'


const Navbar = () => {
  return (
    <nav className={style.nav}>
      <div className={style.logo}>
        <div className="imgen__logo">
          <img src={'https://i.postimg.cc/bvNS4pdL/logo-search.jpg'} alt="Logo Not Fount" width="60px" height="60px" />
        </div>
      </div>

      <div className="nav__search">
        <Search />
      </div>
      <div className={style.buton}>
        <Link to="/addrecipe" className={style.link}>
          <h3 className="button">New Recipe</h3>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;