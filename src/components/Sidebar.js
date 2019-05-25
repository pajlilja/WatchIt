import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { watchStates } from "../Firebase/lists";
import parseName from "../utils/parseName";
import SidebarNavLink from "./SidebarNavLink";
import PosterCardDropTarget from "./PosterCardDropTarget";
import { SignedIn, SignedOut } from "./UserState/UserState";
import { Desktop } from "./Responsive";
import "../css/Sidebar.scss";

/**
 * Markup for the sidebar
 */
function Sidebar({ isOpen }) {
  return (
    <div id="sidebar" className={isOpen ? "open" : "closed"}>
      <div id="sidebar-content">
        <section>
          <h1 id="logo">WatchIt</h1>

          <nav>
            <SidebarNavLink exact to="/">
              <FontAwesomeIcon icon="home" fixedWidth /> Home
            </SidebarNavLink>
            <SidebarNavLink to="/movies">
              <FontAwesomeIcon icon="film" fixedWidth /> Browse movies
            </SidebarNavLink>
            <SidebarNavLink to="/shows">
              <FontAwesomeIcon icon="tv" fixedWidth /> Browse TV shows
            </SidebarNavLink>
          </nav>

          <div className="divisor" />

          <h2>My lists</h2>
          <SignedIn>
            {user => (
              <nav>
                {// dynamically create a link to each list
                // instead of hard coding
                Object.values(watchStates).map(watchState => (
                  <PosterCardDropTarget
                    key={watchState}
                    targetName={watchState}
                  >
                    <SidebarNavLink to={`/user/${user.uid}/${watchState}/`}>
                      {parseName(watchState)}
                    </SidebarNavLink>
                  </PosterCardDropTarget>
                ))}
              </nav>
            )}
          </SignedIn>
          <SignedOut>
            <p>Log in to view your lists</p>
          </SignedOut>
        </section>
        <Desktop>
          {/* Don't display this tip on mobile since drag and drop only works on desktop */}
          <p className="tip-text">
            Tip: You can add to lists with drag and drop
          </p>
        </Desktop>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
