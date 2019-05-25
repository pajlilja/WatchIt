import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import InfiniteScroll from "react-infinite-scroller";
import Season from "./Season";
import Tabs from "../Tabs";
import LoadingEpisodePage from "../Loading/LoadingEpisodePage";
import "../../css/EpisodePage.scss";

function mapSeasonsToTabs(numberOfSeasons, showId) {
  const baseUrl = `/tv/${showId}/episodes`;
  const tabLinks = {
    All: `${baseUrl}/all`,
  };
  for (let i = 1; i <= numberOfSeasons; i++) {
    tabLinks[i] = `${baseUrl}/${i}`;
  }
  return tabLinks;
}

function EpisodePage({
  title,
  seasons,
  errorMsg,
  numberOfSeasons,
  watchedEpisodes,
  seasonNumber,
  isLoading,
  addEpisode,
  removeEpisode,
  showId,
  setSeason,
  loadAndAppend,
}) {
  if (isLoading) {
    return <LoadingEpisodePage />;
  }

  let content;
  if (errorMsg) {
    content = "No episodes found :(";
  } else if (seasonNumber === "all") {
    content = (
      <InfiniteScroll
        loadMore={loadAndAppend}
        hasMore={seasonNumber !== numberOfSeasons}
      >
        {Object.entries(seasons).map(([num, episodes]) => (
          <Season
            key={num}
            episodes={episodes}
            watchedEpisodes={watchedEpisodes}
            seasonNumber={parseInt(num, 10)}
            addEpisode={addEpisode}
            removeEpisode={removeEpisode}
            showId={showId}
            setSeason={setSeason}
          />
        ))}
      </InfiniteScroll>
    );
  } else {
    content = (
      <Season
        episodes={seasons[seasonNumber] || []}
        watchedEpisodes={watchedEpisodes}
        seasonNumber={parseInt(seasonNumber, 10)}
        addEpisode={addEpisode}
        removeEpisode={removeEpisode}
        showId={showId}
        setSeason={setSeason}
      />
    );
  }

  return (
    <section className="container episode-page">
      <Link to={`/tv/${showId}`}>
        <h1 className="show-title">
          <FontAwesomeIcon icon="arrow-left" />
          &nbsp;
          {title}
        </h1>
      </Link>
      <Tabs links={mapSeasonsToTabs(numberOfSeasons, showId)} />
      {content}
    </section>
  );
}

EpisodePage.defaultProps = {
  errorMsg: "",
};

EpisodePage.propTypes = {
  title: PropTypes.string.isRequired,
  seasons: PropTypes.object.isRequired,
  errorMsg: PropTypes.string,
  numberOfSeasons: PropTypes.number.isRequired,
  watchedEpisodes: PropTypes.object.isRequired,
  seasonNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  isLoading: PropTypes.bool.isRequired,
  addEpisode: PropTypes.func.isRequired,
  removeEpisode: PropTypes.func.isRequired,
  showId: PropTypes.string.isRequired,
  setSeason: PropTypes.func.isRequired,
  loadAndAppend: PropTypes.func.isRequired,
};

export default EpisodePage;
