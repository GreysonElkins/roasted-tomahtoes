import React from 'react'
import './Nav.scss'
import PropTypes from "prop-types"
import { NavLink } from 'react-router-dom'

const Nav = ({
  isLoggedIn, 
  logout, 
  user,
  showUserFavoritesPage
  }) => {
  return (
    <nav>
      <h3 className={isLoggedIn ? "" : "hidden"}>Welcome, {user.name}!</h3>
      <div className="button-box">
        <NavLink to="/" className="nav-btn">
            Home
        </NavLink>
        <NavLink to="/login" className={`nav-btn ${ isLoggedIn ? "hidden" : ""}`}>
          Login
        </NavLink>
        <NavLink to='/user-ratings' className={isLoggedIn ? "" : "hidden"}>
          <button className='nav-btn' onClick={showUserFavoritesPage}>
            Your Ratings
          </button>
        </NavLink>
        <button
          className={`nav-btn ${isLoggedIn ? "" : "hidden"}`}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Nav

Nav.propTypes = {
 isLoggedIn: PropTypes.bool,
 showLoginPage: PropTypes.func,
 showHomePage: PropTypes.func,
 user: PropTypes.object,
 logout: PropTypes.func,
 searchMovies: PropTypes.func,
};