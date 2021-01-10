import React, {createContext, useState, useContext} from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({children}) {
  const [FavoriteArray, setFavoriteArray] = useState([]);

  function saveFavorite(favoriteMovie) {
    const newFavorites = [...FavoriteArray, favoriteMovie];
    setFavoriteArray(newFavorites);
    localStorage.setItem("FAVORITE", JSON.stringify(newFavorites));
  }

  function removeFavorite(favoriteMovie) {
    const removeIt = FavoriteArray.filter(
      (movie) => movie.imdbID !== favoriteMovie.imdbID
    );
    setFavoriteArray(removeIt || []);
    localStorage.setItem("FAVORITE", JSON.stringify(removeIt));
  }

  return (
    <FavoriteContext.Provider
      value={{
        FavoriteArray,
        saveFavorite,
        removeFavorite,
        setFavoriteArray,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  return context;
}
