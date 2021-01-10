import React, {useEffect, useState} from "react";
import MovieItem from "../home/components/movieItem";
import "./styles.css";
import NoDataSvg from "../../assets/noDataSvg.svg";
import {useFavorite} from "../../context/context-favorite";
import Typography from "@material-ui/core/Typography";

export default function Favorite() {
  const {FavoriteArray, setFavoriteArray} = useFavorite();
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    getFavorite();
  }, [reloadPage]);

  async function getFavorite() {
    const getFavorites =
      (await JSON.parse(localStorage.getItem("FAVORITE"))) || [];
    setFavoriteArray(getFavorites);
    setReloadPage(true);
  }
  return (
    <div className="home-container">
      <Typography variant="h3" gutterBottom>
        My favorite movies
      </Typography>
      {FavoriteArray.length > 0 ? (
        <div>
          <ul>
            {FavoriteArray.map((movie) => (
              <MovieItem movie={movie} key={movie.imdbID} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="favorite-image-view" style={{flexDirection: "column"}}>
          <Typography variant="h5" gutterBottom>
            You don't have favorite movies
          </Typography>
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
