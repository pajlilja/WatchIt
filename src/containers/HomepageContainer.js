import React, { Component } from "react";
import PropTypes from "prop-types";
import { getNowPlayingMovies, getNowAiringTVShows } from "../api/APIUtils";
import Homepage from "../components/Homepage";
import ErrorMessage from "../components/ErrorMessage";

class HomepageContainer extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    series: PropTypes.array.isRequired,
    setNowPlayingMovies: PropTypes.func.isRequired,
    setNowAiringTVShows: PropTypes.func.isRequired,
  };

  // if the movies and series props aren't empty, don't show loading indicators
  static getDerivedStateFromProps(props) {
    if (props.movies.length !== 0 && props.series.length !== 0) {
      return {
        loadingMovies: false,
        loadingShows: false,
      };
    }
    return null;
  }

  state = {
    error: false,
    loadingMovies: true,
    loadingShows: true,
  };

  componentDidMount() {
    const { movies: m, series: s } = this.props;
    if (m.length !== 0 && s.length !== 0) return;

    getNowPlayingMovies()
      .then(movies => {
        if (!movies) return;
        this.props.setNowPlayingMovies(movies.splice(0, 18));
        this.setState({ loadingMovies: false });
      })
      .catch(() => {
        this.setState({ error: true, loadingMovies: false });
      });

    getNowAiringTVShows()
      .then(series => {
        if (!series) return;
        this.props.setNowAiringTVShows(series.splice(0, 18));
        this.setState({ loadingShows: false });
      })
      .catch(() => {
        this.setState({ error: true, loadingShows: false });
      });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container">
          <ErrorMessage>Oops! Could not load homepage :(</ErrorMessage>
        </div>
      );
    }

    return (
      <Homepage
        movies={this.props.movies}
        series={this.props.series}
        loadingMovies={this.state.loadingMovies}
        loadingShows={this.state.loadingShows}
      />
    );
  }
}

export default HomepageContainer;
