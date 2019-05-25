import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { signUp } from "../../Firebase/UserUtils";
import { errorToast, successToast } from "../../utils/toast";
import { SignedIn } from "../UserState/UserState";
import PrimaryButton from "../PrimaryButton";
import "../../css/SignUpPage.scss";

class SignUpPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  state = {
    email: "",
    password: "",
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    signUp(email, password)
      .then(() => {
        successToast("Succesfully signed up!");
        this.props.history.push("/"); // redirect to home
      })
      .catch(error => {
        errorToast(error.message);
      });
  };

  handleChange = event => {
    if (event.target.type === "email") {
      this.setState({ email: event.target.value });
    }
    if (event.target.type === "password") {
      this.setState({ password: event.target.value });
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="container signup-page">
        <SignedIn>{() => <Redirect to="/" />}</SignedIn>
        <h1>Sign up</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <PrimaryButton>Sign Up</PrimaryButton>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUpPage);
