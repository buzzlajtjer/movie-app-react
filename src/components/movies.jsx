import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 6,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const allGenres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres: allGenres });
  }

  handleGenreSelect = genre => {
    console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = newSortColumn => {
    console.log(newSortColumn);
    this.setState({ sortColumn: newSortColumn });
  };

  handleDelete = movie => {
    console.log(movie);
    const newMovies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: newMovies });
  };

  handleLike = movie => {
    console.log(movie);
    const newMovies = [...this.state.movies];
    const movieIndex = newMovies.indexOf(movie);
    newMovies[movieIndex] = { ...newMovies[movieIndex] };
    newMovies[movieIndex].liked = !newMovies[movieIndex].liked;
    this.setState({ movies: newMovies });
  };

  handlePagination = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies,
      selectedGenre,
      sortColumn
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : this.state.movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const pageMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: pageMovies };
  };

  render() {
    const { pageSize, currentPage, selectedGenre, sortColumn } = this.state;

    const { totalCount, data: pageMovies } = this.getPagedData();

    return (
      <div className="row mt-3 md-3">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>
            {totalCount >= 1
              ? totalCount + " movies in selected genre"
              : " No movies in selected genre"}
          </p>
          <MoviesTable
            onSort={this.handleSort}
            pageMovies={pageMovies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onClick={this.handlePagination}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }

  noMovieMessage() {
    if (this.state.movies.length <= 0) return "No movies in database";
    return this.state.movies.length + " Movies in database";
  }
}

export default Movies;
