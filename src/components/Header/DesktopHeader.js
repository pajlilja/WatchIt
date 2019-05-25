import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Searchbar from "../Searchbar";
import LoginHandler from "../Login/LoginHandler";
import { MediumRes } from "../Responsive";
import "../../css/Header.scss";

/**
 * The header for desktop, which includes search bar and user info
 */
function DesktopHeader({
  setSearchbarValue,
  searchbarValue,
  searchHandler,
  toggleSidebar,
}) {
  return (
    <header id="app-header-desktop" className="app-header">
      <MediumRes>
        <button id="toggle-btn" onClick={toggleSidebar}>
          <FontAwesomeIcon icon="bars" />
        </button>
      </MediumRes>
      <Searchbar
        value={searchbarValue}
        search={searchHandler}
        setSearchbarValue={setSearchbarValue}
      />
      <LoginHandler />
    </header>
  );
}

DesktopHeader.propTypes = {
  searchbarValue: PropTypes.string.isRequired,
  searchHandler: PropTypes.func.isRequired,
  setSearchbarValue: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default DesktopHeader;
