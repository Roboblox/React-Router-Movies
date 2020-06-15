import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Movie from "./Movies/Movie.jsx";
import MovieList from "./Movies/MovieList.jsx";
import SavedList from "./Movies/SavedList.jsx";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get("http://localhost:5000/api/movies")
        .then((res) => {
          setMovieList(res.data);
        })
        .catch((error) => {
          console.error("Server Error", error);
        });
    };
    getMovies();
  }, []);

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />

      <Switch>
        <Route path={"/movies/:id"} component={Movie}>
          <Movie />
        </Route>
        <Route path="/" component={MovieList}>
          <MovieList movies={movieList} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
