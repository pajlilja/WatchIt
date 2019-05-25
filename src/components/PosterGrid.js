import React from "react";
import PropTypes from "prop-types";
import PosterCard from "./PosterCard";
import "../css/PosterGrid.scss";
import { normalizeMovie } from "../api/APIUtils";

/**
 * A responsive grid of PosterCards
 */
function PosterGrid({ movies }) {
  return (
    <div className="poster-grid">
      {movies.map(mov => {
        const movie = normalizeMovie(mov);
        return (
          <PosterCard
            key={movie.id}
            id={movie.id}
            linkTo={`/${movie.media_type}/${movie.id}`}
            title={movie.title}
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
            mediaType={movie.media_type}
            voteAverage={movie.vote_average}
          />
        );
      })}
    </div>
  );
}

PosterGrid.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PosterGrid;
