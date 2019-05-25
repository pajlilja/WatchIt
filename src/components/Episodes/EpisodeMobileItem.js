import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import CheckCircle from "@fortawesome/fontawesome-free-solid/faCheckCircle";
import Circle from "@fortawesome/fontawesome-free-regular/faCircle";
import { SignedIn, SignedOut } from "../UserState/UserState";
import "../../css/EpisodeMobileItem.scss";

class EpisodeMobileItem extends Component {
  static propTypes = {
    addEpisode: PropTypes.func.isRequired,
    removeEpisode: PropTypes.func.isRequired,
    watched: PropTypes.bool.isRequired,
    showId: PropTypes.string.isRequired,
    episodeNumber: PropTypes.number.isRequired,
    seasonNumber: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  render() {
    const { toggle } = this;
    const {
      addEpisode,
      removeEpisode,
      watched,
      name,
      episodeNumber,
      seasonNumber,
      description,
    } = this.props;

    let mobileItem;
    let checkBox;
    const show = {
      id: this.props.showId,
      episodeNumber: this.props.episodeNumber,
      seasonNumber,
    };

    if (watched) {
      checkBox = (
        <button
          className="episodeMobileCheckbox"
          onClick={() => removeEpisode(show)}
        >
          <FontAwesomeIcon icon={CheckCircle} />
        </button>
      );
    } else {
      checkBox = (
        <button
          className="episodeMobileCheckbox"
          onClick={() => addEpisode(show)}
        >
          <FontAwesomeIcon icon={Circle} />
        </button>
      );
    }

    if (this.state.isOpen) {
      mobileItem = (
        <div className="expandedItemBox">
          <div className="expandedTitleBar">
            <div className="episodeNumber">{episodeNumber}</div>
            <div className="episodeTitleBox">{name}</div>
          </div>
          <div className="expandedDescriptionBox">{description}</div>
          <button className="expandBoxButton" onClick={toggle} />
        </div>
      );
    } else {
      mobileItem = (
        <div className="episodeMobileItem">
          <div>
            <div className="episodeNumber">{episodeNumber}</div>
          </div>
          <div className="episodeMobileTitle">{name}</div>
          <button className="expandBoxButton" onClick={toggle} />
          <SignedIn>{() => checkBox}</SignedIn>
          {/* put an empty div so the three column layout still works */}
          <SignedOut>
            <div />
          </SignedOut>
        </div>
      );
    }

    return <div>{mobileItem}</div>;
  }
}

export default EpisodeMobileItem;
