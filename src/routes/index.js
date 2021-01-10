import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "../pages/home";
import Description from "../pages/movieDescription/index";
import Favorites from "../pages/favorite/index";
import {FavoriteProvider} from "../context/context-favorite";

export const Routes = () => (
  <BrowserRouter>
    <FavoriteProvider>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/description" exact component={Description} />
        <Route path="/favorites" exact component={Favorites} />
      </Switch>
    </FavoriteProvider>
  </BrowserRouter>
);
