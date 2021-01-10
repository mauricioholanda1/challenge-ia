import React from "react";
import "../styles.css";
import {useHistory} from "react-router-dom";

export default function CardMovie({movie = []}) {
  const history = useHistory();
  return (
    <li className="movie-item">
      <div
        className="link"
        onClick={() => history.push("/description", {movie})}
      >
        {movie.Poster === "N/A" ? (
          <div className="no-image">
            <p className="text">{movie.Title}</p>
            <p className="text">{movie.Year}</p>
          </div>
        ) : (
          <div>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        )}
      </div>
    </li>
  );
}
