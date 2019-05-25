import React from "react";
import { NavLink } from "react-router-dom";
import "../css/SidebarNavLink.scss";

/**
 * Component for navigation links in the sidebar, which change appearance
 * if you are on the url they link to
 */
function SidebarNavLink(props) {
  return (
    <NavLink {...props} className="sidebar-navlink" activeClassName="active" />
  );
}

export default SidebarNavLink;
