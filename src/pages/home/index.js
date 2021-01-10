import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import * as movies from "../../apis/moviesApi";
import SearchBar from "./components/searchBar";
import Typography from "@material-ui/core/Typography";
import MovieItem from "./components/movieItem";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./styles.css";
import NoDataSvg from "../../assets/noDataSvg.svg";

export default function Home() {
  useEffect(() => {}, []);

  const [textToSearch, setTextToSearch] = useState("");
  const [arrayMovies, setArrayMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setLastPage] = useState(false);

  async function getMovies() {
    const response = await movies.getMovies(textToSearch, 1);
    if (response.Search) {
      setArrayMovies(response.Search);
      setPage(1);
      setLastPage(false);
    } else {
      setArrayMovies([]);
    }
  }

  async function loadMore() {
    const nextPage = page + 1;
    const response = await movies.getMovies(textToSearch, nextPage);
    if (response.Search) {
      if (response.Search.length < 10) {
        const newArrayMovies = arrayMovies.concat(response.Search);
        setArrayMovies(newArrayMovies);
        setLastPage(true);
      } else {
        const newArrayMovies = arrayMovies.concat(response.Search);
        setArrayMovies(newArrayMovies);
        setPage(page + 1);
      }
    }
  }

  return (
    <div className="home-container">
      <header>
        <SearchBar
          setTextToSearch={(text) => setTextToSearch(text)}
          getMovies={() => getMovies()}
        />
      </header>
      <header>
        <Typography variant="h3" gutterBottom>
          Movies
        </Typography>

        <Button href="/FAVORITES" color="primary" startIcon={<FavoriteIcon />}>
          Favorite
        </Button>
      </header>
      {arrayMovies.length > 0 ? (
        <div>
          <ul>
            {arrayMovies.map((movie) => (
              <MovieItem movie={movie} key={movie.imdbID} />
            ))}
          </ul>
          {isLastPage ? null : (
            <div className="button-view">
              <Button
                onClick={() => {
                  loadMore();
                }}
                variant="contained"
                color="primary"
              >
                Load more
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="no-data-view">
          <img
            style={{maxWidth: 500, display: "flex", flex: 1}}
            src={NoDataSvg}
            alt="404"
          />
        </div>
      )}
    </div>
  );
}
