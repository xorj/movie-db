import React from "react";
import { Typography, Grid, Tooltip } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

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

export default function Favorites(props) {
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
        <Link
          to={`movie/${movie.id}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
          key={movie.id}
        >
          <Tooltip title={movie.title} arrow>
            <Grid
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
                  color: theme.palette.common.black,
                }}
              >
                {movie.vote_average}
              </Typography>
            </Grid>
          </Tooltip>
        </Link>
      ))}
    </Grid>
  );
}
