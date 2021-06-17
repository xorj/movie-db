import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

//Componentes
import Loading from "../components/ui/loading/Loading";
import MovieList from "../components/MovieList";
import instance from "../axios";

const useStyles = makeStyles((theme) => ({}));

export default function Search(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  //Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getMovieSearch = () => {
    instance
      .get(
        `search/movie?api_key=${instance.tmdb}&language=pt-BR&query=${props.location.search}&page=1&include_adult=false`
      )
      .then((response) => {
        setResults(response.data.results);
        setLoaded(true);
        if (response.data.results.length < 1) {
          setMessage("Sem resultados para a busca");
        } else {
          setMessage("Resultados:");
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  useEffect(getMovieSearch, [props.location.search]);

  let content = <Loading />;
  if (loaded) {
    content = (
      <Grid
        style={{
          padding: "15px",
          marginTop: "50px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {" "}
          {message}{" "}
        </Typography>
        <MovieList movieList={results} />
      </Grid>
    );
  }
  return <Grid>{content}</Grid>;
}
