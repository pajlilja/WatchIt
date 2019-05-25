import React from "react";
import PropTypes from "prop-types";
import moment from "moment-mini";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import minutesToHours from "../utils/minutesToHours";
import SecondaryButton from "./SecondaryButton";
import AddToListBtn from "../containers/AddToListBtn";
import ImageWithFallback from "./ImageWithFallback";
import "../css/DetailsTitle.scss";

/**
 * The title (poster, name, rating etc) for the movie details page
 */
function DetailsTitle({ movie }) {
  const {
    // movie info
    title,
    genres,
    runtime,
    vote_average: rating,
    poster_path: posterPath,
    release_date: releaseDate,
    // tv info
    name,
    status,
    first_air_date: firstAirDate,
    last_air_date: lastAirDate,
    episode_run_time: episodeRunTime,
    number_of_episodes: numberOfEpisodes,
    number_of_seasons: numberOfSeasons,
    id,
  } = movie;

  let infoLine;
  let isMovie = false;

  // if title is defined, it's a movie
  if (title) {
    isMovie = true;
    infoLine = (
      <div className="info">
        {genres.map(genre => genre.name).join(", ")}
        <span> • </span>
        {minutesToHours(runtime)}
        <span> • </span>
        {moment(releaseDate).format("MMM Do YYYY")}
      </div>
    );
  } else {
    const endingYear =
      status === "Ended" || status === "Canceled"
        ? moment(lastAirDate).format("YYYY")
        : "";
    infoLine = (
      <div className="info">
        {genres.map(genre => genre.name).join(", ")}
        <span> • </span>
        {minutesToHours(episodeRunTime[0])} per episode
        <span> • </span>
        {numberOfEpisodes} episodes, {numberOfSeasons} seasons
        <span> • </span>
        {status}
        <span> • </span>
        {moment(firstAirDate).format("YYYY")}-{endingYear}
      </div>
    );
  }

  let buttons;

  if (isMovie) {
    buttons = (
      <div>
        <AddToListBtn currentMovie={movie} />
        &nbsp;&nbsp;
      </div>
    );
  } else {
    buttons = (
      <div>
        <AddToListBtn currentMovie={movie} />
        &nbsp;&nbsp;
        <SecondaryButton to={`${id}/episodes/`}>Episodes</SecondaryButton>
        &nbsp;&nbsp;
      </div>
    );
  }

  const displayName = title || name;
  const displayDate = releaseDate || firstAirDate;

  return (
    <div className="details-title">
      <ImageWithFallback
        className="poster"
        src={posterPath}
        imgSize="w500"
        alt={`Poster for ${title}`}
        mediaType={isMovie ? "movie" : "tv"}
      />
      <div className="text">
        <h1 className="title">
          {`${displayName} (${moment(displayDate).format("YYYY")})`}
          &nbsp;
          <span className="rating">
            <span className="star-icon">
              <FontAwesomeIcon icon="star" />
            </span>{" "}
            {rating}
          </span>
        </h1>
        <div className="info">{infoLine}</div>
        <div className="bottom">{buttons}</div>
      </div>
    </div>
  );
}

DetailsTitle.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default DetailsTitle;
