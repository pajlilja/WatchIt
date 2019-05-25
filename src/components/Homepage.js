import React from "react";
import PropTypes from "prop-types";
import LoadingGrid from "./Loading/LoadingGrid";
import PosterGrid from "./PosterGrid";

/**
 * Markup for the homepage
 */
function Homepage({ movies, series, loadingMovies, loadingShows }) {
  return (
    <div id="homepage" className="container">
      <h1>Home</h1>
      <section>
        <h2>Now playing movies</h2>
        {loadingMovies && <LoadingGrid />}
        {!loadingMovies && <PosterGrid movies={movies} type="movie" />}
      </section>
      <section>
        <h2>Now airing TV shows</h2>
        {loadingShows && <LoadingGrid />}
        {!loadingShows && <PosterGrid movies={series} type="tv" />}
      </section>
    </div>
  );
}

Homepage.propTypes = {
  movies: PropTypes.array.isRequired,
  series: PropTypes.array.isRequired,
  loadingMovies: PropTypes.bool.isRequired,
  loadingShows: PropTypes.bool.isRequired,
};

export default Homepage;
