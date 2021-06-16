import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

/*Componentes*/
import instance from "../axios";

const useStyles = makeStyles((theme) => ({
  movieBanner: {
    height: "800px",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  movieTitle: {
      padding:"20px 20px 5px 20px",
      backgroundColor: theme.palette.common.white,
      borderRadius: "15px  15px 0 0"
  }

}));

export default function Movies(props) {
  const theme = useTheme();
  const classes = useStyles();

  const [movieInfo, setMovieInfo] = useState({});

  const getMovieInfo = () => {
    instance
      .get(
        `/movie/${props.match.params.id}?api_key=${instance.tmdb}&language=pt-BR
             `
      )
      .then((response) => {
        setMovieInfo(response.data);
      });
  };

  useEffect(getMovieInfo, []);

  return (
    <Grid>
      <Grid
        container
        direction="column"
        justify="flex-end"
        alignItems="center"
        className={classes.movieBanner}
        style={{
          backgroundImage: movieInfo.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path})`
            : "",
        }}
      >
        <Typography variant="h2" className={classes.movieTitle}>{movieInfo.title}</Typography>
      </Grid>
    </Grid>
  );
}
