import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import "../../css/LoginButton.scss";
import { SignedIn, SignedOut } from "../UserState/UserState";
import { Mobile, Desktop } from "../Responsive";
import PrimaryButton from "../PrimaryButton";

function UserLayout({
  onSignOutClick,
  handleChange,
  signInClick,
  email,
  password,
}) {
  // Render user info if signed in, signin-bars otherwise
  return (
    <Fragment>
      <Desktop>
        <SignedIn>
          {user => (
            <div id="user-info">
              {/* Github style avatar generated based in the user's uid */}
              <img
                className="user-img"
                src={`https://avatars.dicebear.com/v2/identicon/${
                  user.uid
                }.svg`}
                alt="User avatar"
              />
              {user.email}
              <button onClick={onSignOutClick}>
                <FontAwesomeIcon icon="sign-out-alt" /> Sign out
              </button>
            </div>
          )}
        </SignedIn>
        <SignedOut>
          <div className="user-info">
            <form onSubmit={signInClick}>
              <div className="login-bars">
                <input
                  id="email-bar"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <div className="password-div">
                  <input
                    className="password-input"
                    id="pass-bar"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <Link className="forgot-password" to="/forgot_password">
                    Forgot password
                  </Link>
                </div>
                <button className="login-btn">Log in</button>
                <Link className="signup-button" to="/signup">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </SignedOut>
      </Desktop>
      <Mobile>
        <div>
          <form onSubmit={signInClick}>
            <div className="login-barsMobile">
              <input
                id="email-bar"
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                id="pass-bar"
                type="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="login-btn-mobile">
              <PrimaryButton>Log in</PrimaryButton>
            </div>
            <div className="signup-btn-mobile">
              <Link className="signup-button" to="/signup">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </Mobile>
    </Fragment>
  );
}

UserLayout.defaultProps = {
  email: "",
  password: "",
};

UserLayout.propTypes = {
  onSignOutClick: PropTypes.func.isRequired,
  signInClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
};

export default UserLayout;
