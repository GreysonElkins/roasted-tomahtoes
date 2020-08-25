import React from 'react'
import './Nav.scss'
import PropTypes from "prop-types"

const Nav = ({
  isLoggedIn, 
  showHomePage, 
  showLoginPage, 
  logout, 
  user,
  showUserFavoritePage
  }) => {
  return (
    <nav>
      <h3 className={isLoggedIn ? "" : "hidden"}>Welcome, {user.name}!</h3>
      <div className="button-box">
        <button id="home-btn" onClick={showHomePage}>
          Home
        </button>
        <button
          className={isLoggedIn ? "" : "hidden"}
          id="ratings-header-btn"
          onClick={showUserFavoritePage}
        >
          Your Ratings
        </button>
        <button
          className={isLoggedIn ? "hidden" : ""}
          id="login-btn"
          onClick={showLoginPage}
        >
          Login
        </button>
        <button
          className={isLoggedIn ? "" : "hidden"}
          id="logout-btn"
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