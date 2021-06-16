import React, { useState, useEffect } from "react";
import { Typography, Grid, Chip } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

/*Componentes*/
import instance from "../axios";

const useStyles = makeStyles((theme) => ({
  movieBanner: {
    paddingTop: "20px",
    height: "100vh",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.common.white,
  },
  movieInfo: {
    padding: "20px 20px 5px 20px",
    backgroundColor: theme.palette.common.white,
    borderRadius: "5px",
    maxWidth: "1000px",
    height: "450px",
    margin: "20px",
  },
  moviePoster: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "60vw",
    height: "90vw",
    [theme.breakpoints.up("md")]: {
      width: "300px",
      height: "450px",
    },
  },
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
        console.log(response.data);
        setMovieInfo(response.data);
      });
  };

  useEffect(getMovieInfo, []);

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.movieBanner}
      style={{
        backgroundImage: movieInfo.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`
          : "",
        boxShadow: "inset 0 0 0 2000px rgb(35 31 34 / 30%)",
      }}
    >
      <Grid
        item
        className={classes.moviePoster}
        style={{
          alignSelf: "left",
          backgroundImage: movieInfo.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original/${movieInfo.poster_path})`
            : "",
        }}
      ></Grid>
      <Grid container direction="column"  className={classes.movieInfo}>
        <Typography variant="h2" gutterBottom>
          {movieInfo.title} (
          {movieInfo.release_date ? movieInfo.release_date.split("-")[0] : ""})
        </Typography>

        <Typography  variant="h4" gutterBottom>{movieInfo.tagline}</Typography>
        <Typography variant="body1" gutterBottom>{movieInfo.overview}</Typography>
        <Typography gutterBottom variant="h4">
          Gêneros:
        </Typography>
        <Grid container>
          {movieInfo.genres
            ? movieInfo.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  color="primary"
                  style={{ marginRight: "5px", color: "#f1f1f1" }}
                  label={genre.name}
                />
              ))
            : ""}
        </Grid>
      </Grid>
    </Grid>
  );
}
