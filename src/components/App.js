import React from "react";
//import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "./api";
import MovieTabs from "./MovieTabs";
import Pagination from "./Pagination";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      page: 1,
      total_pages: [],
    };
  }
  componentDidMount() {
    this.getMovies();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.sort_by !== this.state.sort_by ||
      prevState.page !== this.state.page
    ) {
      this.getMovies();
    }
  }
  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}&total_pages=${this.state.total_pages}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.results,
          page: data.page,
          total_pages: data.total_pages,
        });
      });
  };
  removeMovie = (movie) => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    });
    const updateRemoveWillWatch = this.state.moviesWillWatch.filter(function (
      item
    ) {
      return item.id !== movie.id;
    });
    this.setState({
      movies: updateMovies,
      moviesWillWatch: updateRemoveWillWatch,
    });
  };
  addMovieToWillWatch = (movie) => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);
    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  };
  removeMovieFromWillWatch = (movie) => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function (
      item
    ) {
      return item.id !== movie.id;
    });
    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  };
  updateSortBy = (value) => {
    this.setState({
      sort_by: value,
    });
  };
  previousPage = () => {
    if (this.state.page !== 1) {
      const getPrevious = this.state.page - 1;
      this.setState({
        page: getPrevious,
      });
    }
  };
  nextPage = () => {
    if (this.state.page !== this.state.total_pages) {
      const getNext = this.state.page + 1;
      this.setState({
        page: getNext,
      });
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row mb-3 mt-3">
              <div className="col-12">
                {" "}
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />{" "}
              </div>
              <div className="col-12 mt-3">
                {" "}
                <Pagination
                  nextPage={this.nextPage}
                  previousPage={this.previousPage}
                  page={this.state.page}
                  total_pages={this.state.total_pages}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map((movie) => {
                return (
                  <div className="col-6 mb-3" key={movie.id}>
                    <MovieItem
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4> Will Watch: {this.state.moviesWillWatch.length}</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map((movie) => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
