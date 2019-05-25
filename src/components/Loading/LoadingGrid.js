import React from "react";
import LoadingCard from "./LoadingCard";
import "../../css/PosterGrid.scss";

function LoadingGrid() {
  const loadingCards = [];
  const numberOfCards = 18;

  for (let i = 0; i < numberOfCards; i++) {
    loadingCards.push(<LoadingCard key={i} />);
  }
  return <div className="poster-grid">{loadingCards}</div>;
}

export default LoadingGrid;
