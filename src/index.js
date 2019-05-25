import "babel-polyfill"; // async await
import "whatwg-fetch"; // fetch polyfill
import "url-search-params-polyfill"; // URLSearchParams polyfill
import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import fontawesome from "@fortawesome/fontawesome";
import faSolid from "@fortawesome/fontawesome-free-solid";
import App from "./containers/App";
import "./css/index.scss";
import "./css/responsive.scss";

fontawesome.library.add(faSolid);

const app = (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(app, document.getElementById("root"));
