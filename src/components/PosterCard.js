import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { DragSource } from "react-dnd";
import { getYearFromDate } from "../api/APIUtils";
import ImageWithFallback from "./ImageWithFallback";
import "../css/PosterCard.scss";

/**
 * Reusable component for showing a movie poster and title
 */
class PosterCard extends Component {
  static propTypes = {
    /** From react-dnd */
    connectDragSource: PropTypes.func.isRequired,
    /** ID is important for drag and drop to work, in order to identify the movie */
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterPath: PropTypes.string,
    linkTo: PropTypes.string.isRequired,
    releaseDate: PropTypes.string,
    mediaType: PropTypes.string.isRequired,
  };

  static defaultProps = {
    releaseDate: "",
    posterPath: "",
  };

  render() {
    const {
      id,
      title,
      posterPath,
      linkTo,
      releaseDate,
      mediaType,
      connectDragSource,
    } = this.props;
    const releaseYear = releaseDate ? ` (${getYearFromDate(releaseDate)})` : "";

    const fallbackUrl = `/${mediaType}/${id}`;

    return connectDragSource(
      <div>
        <Link className="poster-card" to={linkTo || fallbackUrl} draggable>
          <ImageWithFallback
            src={posterPath}
            imgSize="w342"
            mediaType={mediaType}
            alt={`Poster for ${title}`}
            className="poster"
          />
          <p className="title">
            {title}
            {releaseYear}
          </p>
        </Link>
      </div>,
    );
  }
}

const cardSource = {
  // beginDrag should return an object, the "payload" of the drag and drop
  beginDrag(props) {
    return {
      id: props.id,
      title: props.title,
      media_type: props.mediaType,
      vote_average: props.voteAverage,
      release_date: props.releaseDate,
      poster_path: props.posterPath,
    };
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
  };
}

export default DragSource("PosterCard", cardSource, collect)(PosterCard);
