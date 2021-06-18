import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";

//Componentes
import Loading from "../components/ui/loading/Loading";
import MovieList from "../components/MovieList";
import instance from "../axios";

const useStyles = makeStyles((theme) => ({
  title: {
    maxWidth: "350px",
    fontSize: "35px",
    margin: "20px 0",
    padding: "0 15px 15px 15px",
    borderBottom: `5px solid ${theme.palette.common.green}`,
    borderRight: `5px solid ${theme.palette.common.green}`,
    borderRadius: "0px 0px 40px 0px",
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search(props) {
  const classes = useStyles();
  let query = useQuery();

  const [loaded, setLoaded] = useState(false);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  let location = useLocation();

  const getMovieSearch = () => {
    instance
      .get(
        `search/movie?api_key=${instance.tmdb}&language=pt-BR&query=${query.get(
          "q"
        )}&page=1&include_adult=false`
      )
      .then((response) => {
        setResults(response.data.results);
        setLoaded(true);
        if (response.data.results.length < 1) {
          setMessage("Sem resultados para a busca");
        } else {
          setMessage("Resultados da busca");
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  // eslint-disable-next-line
  useEffect(getMovieSearch, [location]);

  let content = <Loading />;
  if (loaded) {
    content = (
      <Grid
        style={{
          padding: "15px",
        }}
      >
        <Typography align="left" variant="h4" className={classes.title}>
          {message}
        </Typography>

        <MovieList
          movieList={results}
          toggleFavorite={props.toggleFavorite}
          favorites={props.favorites}
        />
      </Grid>
    );
  }
  return <Grid>{content}</Grid>;
}
