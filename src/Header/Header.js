import React from "react";
import Search from "../Search/Search";
import Nav from "../Nav/Nav";
import "./Header.scss";
import PropTypes from "prop-types";

const Header = ({
  isLoggedIn,
  showLoginPage,
  showHomePage,
  user,
  logout,
  searchMovies,
  showRatingsPage,
}) => {
  return (
    <header id="header">
      <h1 className="logo">
        R🍅asted
        <br /> T🍅mahtoes
      </h1>
      <Search searchMovies={searchMovies} />
      <Nav
        isLoggedIn={isLoggedIn}
        showLoginPage={showLoginPage}
        showHomePage={showHomePage}
        showRatingsPage={showRatingsPage}
        user={user}
        logout={logout}
        id="search"
      />
    </header>
  );
};

export default Header;

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  showLoginPage: PropTypes.func,
  showHomePage: PropTypes.func,
  user: PropTypes.object,
  logout: PropTypes.func,
  searchMovies: PropTypes.func,
};
