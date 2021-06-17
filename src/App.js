import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core/";

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import theme from "./components/ui/Theme";

/*Componentes*/
import Header from "./components/ui/Header";

/*Páginas*/
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path="/search" component={Search} />
          <Route path="/movie/:id" component={Movie} />
          <Route exact path="/" component={Home} />
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
