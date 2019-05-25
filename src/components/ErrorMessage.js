import React from "react";
import PropTypes from "prop-types";
import "../css/ErrorMessage.scss";

/**
 * Generic reusable component for showing error messages
 */
function ErrorMessage({ children }) {
  return <div className="error-text">{children}</div>;
}

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
