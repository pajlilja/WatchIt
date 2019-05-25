import React, { Component } from "react";
import { resetPassword } from "../Firebase/UserUtils";
import { successToast, errorToast } from "../utils/toast";
import PrimaryButton from "../components/PrimaryButton";
import "../css/NewPassword.scss";

class NewPassword extends Component {
  state = {
    email: "",
  };

  handleChange = event => {
    if (event.target.type === "email") {
      this.setState({ email: event.target.value });
    }
  };

  retrievePasswordClick = event => {
    event.preventDefault();
    const { email } = this.state;
    resetPassword(email)
      .then(() => {
        successToast(`An email to ${email} has been sent`);
      })
      .catch(error => {
        errorToast(error.message);
      });
  };

  render() {
    return (
      <div id="new-password" className="container">
        <h1>Password Reset</h1>
        <p>Enter your email below to reset your password</p>
        <form onSubmit={this.retrievePasswordClick}>
          <input
            id="email-bar"
            className="emailReset"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <br />
          <PrimaryButton>Reset password</PrimaryButton>
        </form>
      </div>
    );
  }
}

export default NewPassword;
