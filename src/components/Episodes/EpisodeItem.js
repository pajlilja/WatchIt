import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import CheckCircle from "@fortawesome/fontawesome-free-solid/faCheckCircle";
import Circle from "@fortawesome/fontawesome-free-regular/faCircle";
import ImageWithFallback from "../ImageWithFallback";
import { SignedIn } from "../UserState/UserState";
import "../../css/EpisodeItem.scss";

function EpisodeItem({
  episodeNumber,
  seasonNumber,
  name,
  poster,
  description,
  addEpisode,
  removeEpisode,
  watched,
  showId,
}) {
  let checkBox;
  const show = {
    id: showId,
    episodeNumber,
    seasonNumber,
  };

  if (watched) {
    checkBox = (
      <button className="episodeCheckbox" onClick={() => removeEpisode(show)}>
        <FontAwesomeIcon icon={CheckCircle} />
      </button>
    );
  } else {
    checkBox = (
      <button className="episodeCheckbox" onClick={() => addEpisode(show)}>
        <FontAwesomeIcon icon={Circle} />
      </button>
    );
  }

  return (
    <div className="episodeItem">
      <div className="image-wrapper">
        <ImageWithFallback
          src={poster}
          imgSize="original"
          mediaType="tv"
          alt={`Poster for ${name}`}
          className="episodePic"
        />
      </div>
      <div className="episodeTextBox">
        <h1 className="episodeTitle">
          {episodeNumber}
          &nbsp;
          {name}
        </h1>
        <div className="episodeTextContent">{description}</div>
      </div>
      <SignedIn>{() => checkBox}</SignedIn>
    </div>
  );
}

EpisodeItem.defaultProps = {
  poster: "", // some episodes have no image
};

EpisodeItem.propTypes = {
  episodeNumber: PropTypes.number.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  poster: PropTypes.string,
  description: PropTypes.string.isRequired,
  addEpisode: PropTypes.func.isRequired,
  removeEpisode: PropTypes.func.isRequired,
  watched: PropTypes.bool.isRequired,
  showId: PropTypes.string.isRequired,
};

export default EpisodeItem;
