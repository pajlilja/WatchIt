import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "../css/Searchbar.scss";

/**
 * Reusable generic searchbar component with event handlers for
 * value change and submit, and a clear input button
 */
class Searchbar extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired,
    setSearchbarValue: PropTypes.func.isRequired,
  };

  inputRef = React.createRef();

  onSubmit = e => {
    e.preventDefault();
    const { value } = this.inputRef.current;
    this.props.search(value);
  };

  onChange = e => {
    const { value } = e.target;
    this.props.search(value);
  };

  clearText = e => {
    e.preventDefault();
    this.props.setSearchbarValue("");
    this.inputRef.current.focus();
  };

  render() {
    const { onChange, onSubmit } = this;
    const { value } = this.props;

    return (
      <form className="searchbar" onSubmit={onSubmit}>
        <FontAwesomeIcon icon="search" />
        <input
          type="text"
          ref={this.inputRef}
          value={value}
          onChange={onChange}
          placeholder="Search"
        />
        {value && (
          <button type="button" onClick={this.clearText} className="clear-btn">
            <FontAwesomeIcon icon="times" />
          </button>
        )}
      </form>
    );
  }
}

export default Searchbar;
