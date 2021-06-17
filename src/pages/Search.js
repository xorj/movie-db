import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

//Componentes
import Loading from "../components/ui/loading/Loading";
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
        const searchQuery = props.location.search
          .replace("%20", " ")
          .substr(1, props.location.search.length - 1)
          .trim();

        if (response.data.results.length < 1) {
          setMessage(`Sem resultados para a busca "${searchQuery}"`);
        } else {
          setMessage(
            `${props.location.search.length} resultados para "${searchQuery}"`
          );
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
      <React.Fragment>
        <Typography className="results-title"> {message} </Typography>
        {console.log(results)}
      </React.Fragment>
    );
  }
  return <Grid>{content}</Grid>;
}
