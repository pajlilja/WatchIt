import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import smoothScrollTo from "../utils/smoothScroll";
import "../css/Scroll.scss";

/**
 * Component for a horizontal scrolling list
 */
class Scroll extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    arrayLength: PropTypes.number.isRequired,
  };

  state = {
    width: 0,
    hasScrolledToEnd: false,
    hasScrolledToStart: true,
  };

  scrollRef = React.createRef();

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
    this.checkArrows(this.scrollRef.current);
  };

  checkArrows = elem => {
    const hasScrolledToEnd =
      elem.scrollLeft >= elem.scrollWidth - elem.offsetWidth;
    const hasScrolledToStart = elem.scrollLeft <= 0;
    this.setState({
      hasScrolledToEnd,
      hasScrolledToStart,
    });
  };

  onScroll = event => {
    this.checkArrows(event.target);
  };

  scrollRight = () => {
    const elem = this.scrollRef.current;
    const { offsetWidth, scrollLeft } = elem;
    const scrollDistance = offsetWidth * 0.66;
    smoothScrollTo(elem, scrollLeft + scrollDistance, 400);
  };

  scrollLeft = () => {
    const elem = this.scrollRef.current;
    const { offsetWidth, scrollLeft } = elem;
    const scrollDistance = offsetWidth * 0.66;
    smoothScrollTo(elem, scrollLeft - scrollDistance, 400);
  };

  render() {
    const { hasScrolledToEnd, hasScrolledToStart } = this.state;
    // Fixed width of all postercard images such as cast and recommendations.
    const imageWidth = 170;
    // sidebar width is constant 250px.
    const sidebarWidth = 250;

    // is true if there are enough elements so that scroll is enabled
    const isOverFlow =
      this.props.arrayLength * imageWidth > this.state.width - sidebarWidth;

    // don't show arrows if scrolled to the end/beginning
    const showLeftArrow = !hasScrolledToStart && isOverFlow;
    const showRightArrow = !hasScrolledToEnd && isOverFlow;

    // add the "hidden" class if the arrows shouldn't be visible
    const leftArrowClasses = `leftbutton scroll-button ${
      !showLeftArrow ? "hidden" : ""
    }`;
    const rightArrowClasses = `rightbutton scroll-button ${
      !showRightArrow ? "hidden" : ""
    }`;

    return (
      <div className="outer-div">
        <button className={leftArrowClasses} onClick={this.scrollLeft}>
          <FontAwesomeIcon icon="angle-left" />
        </button>
        <div
          className="scrolling-wrapper-flexbox"
          ref={this.scrollRef}
          onScroll={this.onScroll}
        >
          {this.props.children}
        </div>
        <button className={rightArrowClasses} onClick={this.scrollRight}>
          <FontAwesomeIcon icon="angle-right" />
        </button>
      </div>
    );
  }
}

export default Scroll;
