import React, { useState, useEffect } from "react";
import { Typography, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/*Componentes*/
import instance from "../axios";
import MovieList from "../components/MovieList";

const useStyles = makeStyles((theme) => ({
  title: {
    maxWidth: "300px",
    fontSize: "35px",
    margin: "20px 0",
    padding: "0 15px 15px 15px",
    borderBottom: `5px solid ${theme.palette.common.green}`,
    borderRight: `5px solid ${theme.palette.common.green}`,
    borderRadius: "0px 0px 40px 0px",
  },
}));

export default function Favorites(props) {
  const classes = useStyles();
  const [movieList, setMovieList] = useState([]);


  //useEffect(loadMovies, [props.favorites]);

  return (
    <Grid container direction="column" style={{ padding: "15px" }}>
      <Typography align="left" variant="h4" className={classes.title}>
        Filmes Favoritos
      </Typography>
      <MovieList movieList={movieList} toggleFavorite={props.toggleFavorite}/>
    </Grid>
  );
}
