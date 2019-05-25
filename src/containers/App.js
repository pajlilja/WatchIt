import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { watchStates } from "../Firebase/lists";
import { UserProvider } from "../Firebase/UserContext";
import ScrollToTop from "../components/ScrollToTop";
import HomepageContainer from "./HomepageContainer";
import SearchpageContainer from "./SearchpageContainer";
import Sidebar from "../components/Sidebar";
import DynamicHeader from "../containers/DynamicHeader";
import DetailspageContainer from "./DetailspageContainer";
import ActorPageContainer from "./ActorPageContainer";
import UserList from "../containers/UserList";
import BrowseMoviesContainer from "./BrowseMoviesContainer";
import BrowseTvContainer from "./BrowseTvContainer";
import EpisodeContainer from "./EpisodeContainer";
import createDebouncedFunc from "../utils/createDebouncedFunc";
import NewPassword from "../components/NewPassword";
import NotFoundPage from "../components/404";
import SignUpPage from "../components/Login/SignUpPage";
import "../css/App.scss";

const SEARCH_DEBOUNCE_TIME = 500;

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired, // from react-router
  };

  /**
   * This function makes the sidebar close whenever
   * the user clicks a link in the sidebar
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.location !== nextProps.location) {
      return {
        sidebarIsOpen: false,
        location: nextProps.location,
      };
    }
    return { location: nextProps.location };
  }

  state = {
    sidebarIsOpen: false, // only affects mobile
    searchWords: "",
    nowPlayingMovies: [],
    nowAiringTVShows: [],
    currentMovie: {},
    currentActor: {},
    searchResults: {
      results: [],
      currentPage: null,
      totalResults: null,
      totalPages: null,
    },
  };

  setCurrentActor = currentActor => {
    this.setState({ currentActor });
  };

  setCurrentMovie = currentMovie => {
    this.setState({ currentMovie });
  };

  setNowPlayingMovies = nowPlayingMovies => {
    this.setState({ nowPlayingMovies });
  };

  setNowAiringTVShows = nowAiringTVShows => {
    this.setState({ nowAiringTVShows });
  };

  setSearchResults = searchResults => {
    this.setState({ searchResults });
  };

  toggleSidebar = () => {
    this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen });
  };

  closeSidebar = () => {
    this.setState({ sidebarIsOpen: false });
  };

  searchHandler = query => {
    this.setSearchbarValue(query);
    this.search(query);
  };

  search = createDebouncedFunc(query => {
    // don't need to search if the user just clears the search bar
    if (query === "") return;
    this.props.history.push(`/search?query=${query}`);
  }, SEARCH_DEBOUNCE_TIME);

  setSearchbarValue = searchWords => {
    this.setState({ searchWords });
  };

  render() {
    const {
      sidebarIsOpen,
      nowPlayingMovies,
      nowAiringTVShows,
      searchResults,
      currentMovie,
      currentActor,
    } = this.state;

    const sidebarOverlay = (
      <div
        id="overlay"
        className={sidebarIsOpen ? "open" : "closed"}
        onClick={this.closeSidebar}
        role="presentation"
      />
    );

    const listNames = Object.values(watchStates).join("|");

    return (
      <UserProvider>
        <ScrollToTop>
          {sidebarOverlay}
          <ToastContainer
            className="toast-container"
            toastClassName="toast"
            hideProgressBar
            closeButton={false}
            position="bottom-left"
            transition={Slide}
            autoClose={3000}
          />
          <Sidebar isOpen={sidebarIsOpen} closeSidebar={this.closeSidebar} />
          <div id="main-container">
            <DynamicHeader
              toggleSidebar={this.toggleSidebar}
              searchHandler={this.searchHandler}
              setSearchbarValue={this.setSearchbarValue}
              searchbarValue={this.state.searchWords}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <HomepageContainer
                    movies={nowPlayingMovies}
                    series={nowAiringTVShows}
                    setNowPlayingMovies={this.setNowPlayingMovies}
                    setNowAiringTVShows={this.setNowAiringTVShows}
                  />
                )}
              />
              <Route
                exact
                path="/shows"
                render={() => <Redirect to="/shows/popular" />}
              />
              <Route
                path="/shows/:filter/:id?"
                render={props => <BrowseTvContainer {...props} />}
              />
              <Route
                exact
                path="/movies"
                render={() => <Redirect to="/movies/popular" />}
              />
              <Route
                path="/movies/:filter/:id?"
                render={props => <BrowseMoviesContainer {...props} />}
              />
              <Route
                exact
                path="/:mediaType(movie|tv)/:id"
                render={props => (
                  <DetailspageContainer
                    {...props}
                    currentMovie={currentMovie}
                    setCurrentMovie={this.setCurrentMovie}
                  />
                )}
              />
              <Route
                exact
                path="/person/:id"
                render={props => (
                  <ActorPageContainer
                    {...props}
                    currentActor={currentActor}
                    setCurrentActor={this.setCurrentActor}
                  />
                )}
              />
              <Route
                exact
                path="/tv/:id/episodes"
                render={() => <Redirect to="all" />}
              />
              <Route
                exact
                path="/tv/:id/episodes/:seasonNumber"
                render={props => (
                  <EpisodeContainer {...props} currentMovie={currentMovie} />
                )}
              />
              <Route
                path="/search"
                render={() => (
                  <SearchpageContainer
                    searchResults={searchResults}
                    setSearchResults={this.setSearchResults}
                  />
                )}
              />
              <Route
                exact
                path="/user/:userId/:listName/"
                render={() => <Redirect to="all" />}
              />
              <Route
                path={`/user/:userId/:listName(${listNames})/:mediaType(all|movie|tv)`}
                component={UserList}
              />
              <Route exact path="/forgot_password" component={NewPassword} />
              <Route path="/signup" component={SignUpPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </ScrollToTop>
      </UserProvider>
    );
  }
}

// DragDropContext enables react-dnd to work in our app
// withRouter gives App access to history, location, match
export default withRouter(DragDropContext(HTML5Backend)(App));
