import React, { Fragment, useEffect, useState } from "react";

import Loading from "../Loader/Loading";
import { getMovies, clearErrors } from "../../actions/movieAction";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "../Home/MovieCard";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData"; 

const MovieSearch = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [nextPage, setNextPage] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, error, movies, totalPages } = useSelector(
    (state) => state.movies
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMovies(pageNumber, "search", match.params.query));
  }, [dispatch, error, alert, pageNumber, match.params.query,isAuthenticated]);

  useEffect(() => {
    setNextPage((prevNextPage) => {
      if (movies) return [...prevNextPage, ...movies];
    });
  }, [movies, match.params.query]);

  useEffect(() => {
    setNextPage([]);
    setPageNumber(1);
  }, [match.params.query,isAuthenticated]);

  if (pageNumber <= totalPages) {
    window.onscroll = function () {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        setPageNumber(pageNumber + 1);
      }
    };
  }

  return (
    <Fragment>
      <MetaData title={`Search results for ${match.params.query}`} />
      <div className="movieContainer">
        {nextPage.length === 0 ? (
          <h1 style={{ fontSize: "3vmax", color: "rgb(0, 255, 191)" }}>
            {loading ? "" : `No Results found for ${match.params.query} :(`}
          </h1>
        ) : (
          nextPage.map((movie) => <MovieCard movie={movie}></MovieCard>)
        )}
      </div>
      <div className="loader">{loading ? <Loading /> : ""}</div>
    </Fragment>
  );
};

export default MovieSearch;
