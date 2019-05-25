import React from "react";
import PropTypes from "prop-types";
import parseName from "../utils/parseName";

/**
 * Radio button with label for the ListPickerModal component
 */
function ListPickerRadio({ value, current, onChange }) {
  return (
    <label htmlFor={`listform-${value}`}>
      <input
        type="radio"
        name="chosen-list"
        id={`listform-${value}`}
        value={value}
        checked={value === current}
        onChange={onChange}
      />{" "}
      {parseName(value)}
    </label>
  );
}

ListPickerRadio.defaultProps = {
  current: "",
};

ListPickerRadio.propTypes = {
  /* value represents the list this radio button corresponds to */
  value: PropTypes.string.isRequired,
  /* current is the value of the currently selected radio button in the ListPickerModal */
  current: PropTypes.string,
  /* what happens when a radio button is selected */
  onChange: PropTypes.func.isRequired,
};

export default ListPickerRadio;
