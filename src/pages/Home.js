import React, { useState, useEffect } from "react";
import { Typography, Grid, IconButton, Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

/*Icones*/
import { ArrowBack as Left, ArrowForward as Right } from "@material-ui/icons/";

/*Componentes*/
import instance from "../axios";
import MovieList from "../components/MovieList";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "35px",
    margin: "20px 0",
    paddingLeft: "15px",
    borderLeft: `5px solid ${theme.palette.common.green}`,
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
  const theme = useTheme();
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
    <Grid container direction="column" style={{padding: "15px"}}>
      <Typography align="left" variant="h4" className={classes.title}>
        Filmes Populares
      </Typography>
      <MovieList movieList={movieList} />

      <Grid
        container
        className="pagination"
        direction="row"
        justify="center"
        alignItems="center"
        style={{paddingTop: "10px"}}
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
