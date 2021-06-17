import React, { useState, useEffect } from "react";
import { Typography, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/*Icones*/
import { ArrowBack as Left, ArrowForward as Right } from "@material-ui/icons/";

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
  currentPage: {
    backgroundColor: theme.palette.common.green,
    width: "3rem",
    height: "3rem",
    borderRadius: "2rem",
    color: theme.palette.common.white,
  },
}));

export default function Home(props) {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [movieList, setMovieList] = useState([]);

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const loadMovies = () => {
    instance
      .get(
        `movie/popular?api_key=${instance.tmdb}&language=pt-BR&page=${currentPage}`
      )
      .then((response) => {
        setMovieList(response.data.results);
        setTotalPages(response.data.total_page);
      });
  };

  useEffect(loadMovies, [currentPage]);

  return (
    <Grid container direction="column" style={{ padding: "15px" }}>
      <Typography align="left" variant="h4" className={classes.title}>
        Filmes Populares
      </Typography>
      <MovieList
        movieList={movieList}
        toggleFavorite={props.toggleFavorite}
        favorites={props.favorites}
      />

      <Grid
        container
        className="pagination"
        direction="row"
        justify="center"
        alignItems="center"
        style={{ paddingTop: "10px" }}
      >
        <IconButton onClick={previousPage} disabled={currentPage <= 1}>
          <Left style={{ fontSize: 35 }} />
        </IconButton>
        <Typography
          className={classes.currentPage}
          variant="h5"
          component={Grid}
          container
          alignItems="center"
          justify="center"
        >
          {currentPage}
        </Typography>
        <IconButton onClick={nextPage} disabled={currentPage >= totalPages}>
          <Right style={{ fontSize: 35 }} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
