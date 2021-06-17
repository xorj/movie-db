import React, { useEffect } from "react";
import { Typography, Grid, Tooltip, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//Icones//
import { Info, StarBorder as NonFav, Star as Fav } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  movieCard: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "200px",
    height: "300px",
    border: "1px solid #f1f1f1",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  movieList: {
    gridGap: "20px",
  },
}));

export default function MovieList(props) {
  const theme = useTheme();
  const classes = useStyles();
  const movieList = props.movieList;

  return (
    <Grid
      container
      direction="row"
      justify="center"
      className={classes.movieList}
    >
      {movieList.map((movie) => (
        <Tooltip title={movie.title} key={movie.id} arrow>
          <Grid
            container
            direction="column"
            justify="space-between"
            className={classes.movieCard}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w780/${movie.poster_path})`,
            }}
          >
            <Typography
              variant="h4"
              align="center"
              style={{
                background: "rgba(241,241,241, 0.6)",
                borderRadius: "0px 0px 20px 0px",
                width: "60px",
                height: "1.8rem",
                color: theme.palette.common.black,
              }}
            >
              {movie.vote_average}
            </Typography>
            <Grid
              container
              justify="space-between"
              style={{ marginLeft: "auto" }}
            >
              <Button
                style={{ margin: "5px 10px", height: "30px" }}
                variant="contained"
                color="primary"
                onClick={() => props.toggleFavorite(movie.id)}
              >
                {props.favorites.indexOf(movie.id) !== -1 ? (
                  <Fav color="secondary" fontSize="small" />
                ) : (
                  <NonFav color="secondary" fontSize="small" />
                )}
              </Button>
              <Button
                style={{ margin: "5px 10px", height: "30px" }}
                variant="contained"
                color="primary"
                component={Link}
                to={`/movie/${movie.id}`}
                endIcon={<Info color="secondary" fontSize="small" />}
              >
                Info
              </Button>
            </Grid>
          </Grid>
        </Tooltip>
      ))}
    </Grid>
  );
}
