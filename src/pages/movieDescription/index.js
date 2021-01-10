import React, {useEffect, useState} from "react";
import * as movies from "../../apis/moviesApi";
import "./styles.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {useFavorite} from "../../context/context-favorite";
import NoDataSvg from "../../assets/noDataSvg.svg";

export default function Description(props) {
  const {
    FavoriteArray,
    saveFavorite,
    removeFavorite,
    setFavoriteArray,
  } = useFavorite();

  const {movie} = props.history.location.state;

  const [movieInfo, setMovieInfo] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    getFavorite();
    getMovieInfo();
    if (FavoriteArray) {
      const hasFavorite = FavoriteArray.find(
        (someMovie) => someMovie.imdbID === movie.imdbID
      );
      setIsFavorite(!!hasFavorite);
    }
  }, [reloadPage]);

  async function getFavorite() {
    const getFavorites =
      (await JSON.parse(localStorage.getItem("FAVORITE"))) || [];
    setFavoriteArray(getFavorites);
    setReloadPage(true);
  }

  async function getMovieInfo() {
    try {
      const response = await movies.getMovieInfo(movie.imdbID);
      setMovieInfo(response);
    } catch (error) {
      setErro(true);
      setMovieInfo([]);
    }
  }

  if (erro) {
    return (
      <div className="no-data-view" style={{flexDirection: "column"}}>
        <Typography variant="h5" gutterBottom>
          Ops! We have a problem
        </Typography>
        <img
          style={{maxWidth: 500, display: "flex", flex: 1}}
          src={NoDataSvg}
          alt="404"
        />
      </div>
    );
  }

  const Actors = movieInfo.Actors ? movieInfo.Actors.split(", ") : [];
  const Genre = movieInfo.Genre ? movieInfo.Genre.split(", ") : [];
  const Director = movieInfo.Director ? movieInfo.Director.split(", ") : [];

  return (
    <div className="movie-container">
      <div className="movie-view">
        <div className="movie-info-view">
          <Typography variant="h6" gutterBottom>
            {`${movieInfo.Runtime} - ${movieInfo.Year}`}
          </Typography>

          <Typography variant="h2" gutterBottom>
            {movieInfo.Title}
          </Typography>

          {isFavorite ? (
            <Button
              onClick={() => {
                removeFavorite(movie);
                setIsFavorite(false);
              }}
              variant="contained"
              color="secondary"
              startIcon={<FavoriteIcon />}
            >
              Favoritos
            </Button>
          ) : (
            <Button
              onClick={() => {
                saveFavorite(movie);
                setIsFavorite(true);
              }}
              variant="outlined"
              color="secondary"
              startIcon={<FavoriteIcon />}
            >
              Like
            </Button>
          )}

          {movieInfo.Ratings ? (
            <div className="movie-column">
              <Typography variant="h6" gutterBottom>
                Ratings
              </Typography>
              <div className="movie-column">
                {movieInfo.Ratings.map((ratings) => (
                  <div style={{marginRight: 10}}>
                    <Typography variant="body1" gutterBottom>
                      {`${ratings.Source} - ${ratings.Value}`}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="movie-column">
            <Typography variant="h6" gutterBottom>
              Plot
            </Typography>
            <Typography variant="body1" gutterBottom>
              {movieInfo.Plot}
            </Typography>
          </div>

          <div className="movie-option-view">
            <div className="movie-column">
              <Typography variant="h6" gutterBottom>
                Cast
              </Typography>
              {Actors.map((actors) => (
                <Typography variant="body1" gutterBottom>
                  {actors}
                </Typography>
              ))}
            </div>

            <div className="movie-column" style={{marginLeft: 10}}>
              <Typography variant="h6" gutterBottom>
                Genre
              </Typography>
              {Genre.map((genre) => (
                <Typography variant="body1" gutterBottom>
                  {genre}
                </Typography>
              ))}
            </div>

            <div className="movie-column" style={{marginLeft: 10}}>
              <Typography variant="h6" gutterBottom>
                Director
              </Typography>
              {Director.map((director) => (
                <Typography variant="body1" gutterBottom>
                  {director}
                </Typography>
              ))}
            </div>
          </div>
        </div>
        <div className="movie-image-view">
          <img src={movieInfo.Poster} alt={movieInfo.Title} />
        </div>
      </div>
    </div>
  );
}
