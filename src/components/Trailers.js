import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "../css/Scroll.scss";

class Trailers extends Component {
  static propTypes = {
    trailers: PropTypes.array.isRequired,
  };

  state = {
    index: 0,
  };

  scrollRight = () => {
    const { index } = this.state;
    this.setState({
      index: (index + 1) % this.props.trailers.length,
    });
  };

  scrollLeft = () => {
    let { index } = this.state;
    index = index === 0 ? index - 1 + this.props.trailers.length : index - 1;
    this.setState({ index });
  };

  render() {
    if (this.props.trailers.length === 0) {
      return <div>No trailers to show</div>;
    }

    const trailerFrame = (
      <div className="embed-container">
        <iframe
          src={`https://www.youtube.com/embed/${
            this.props.trailers[this.state.index].key
          }`}
          frameBorder="0"
          title={this.state.currentTrailer}
          allowFullScreen
        />
      </div>
    );

    if (this.props.trailers.length === 1) {
      return <div className="outer-div">{trailerFrame}</div>;
    }
    return (
      <div className="outer-div">
        <button className="leftbutton scroll-button">
          <FontAwesomeIcon icon="angle-left" onClick={this.scrollLeft} />
        </button>
        {trailerFrame}
        <button className="rightbutton scroll-button">
          <FontAwesomeIcon icon="angle-right" onClick={this.scrollRight} />
        </button>
      </div>
    );
  }
}

export default Trailers;
