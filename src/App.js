import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core/";

import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import theme from "./components/ui/Theme";

/*Componentes*/
import Header from "./components/ui/Header";

/*Páginas*/
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import Favorites from "./pages/Favorites";

function App() {
  const [favorites, setFavorites] = useState(
    JSON.parse(window.localStorage.getItem("FAVORITOS")) || []
  );

  const toggleFavorite = (id) => {
    let list = favorites;
    const index = list.indexOf(id);
    if (index !== -1) {
      list = list.splice(index, 1);
    } else {
      list.push(id);
    }
    console.log(list);

    window.localStorage.setItem("FAVORITOS", JSON.stringify(list));
    setFavorites([...list]);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/search">
            <Search toggleFavorite={toggleFavorite} favorites={favorites} />
          </Route>
          <Route path="/movie/:id" component={Movie} />
          <Route path="/favorites">
            <Favorites toggleFavorite={toggleFavorite} favorites={favorites} />
          </Route>
          <Route exact path="/">
            <Home toggleFavorite={toggleFavorite} favorites={favorites} />
          </Route>
          <Route
            component={() => (
              <Typography
                style={{
                  padding: "2vh",
                }}
              >
                404 - Página não Encontrada
              </Typography>
            )}
          />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
