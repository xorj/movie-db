import React, { useState } from "react";
import {
  AppBar,
  useMediaQuery,
  Toolbar,
  Grid,
  Typography,
  TextField,
  Button,
  Hidden,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

/*Icones*/
import { LocalMovies as Icon, Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: "5rem",
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "1em",
  
  },
  icon: {
    width: "150px",
    padding: "5px",
    color: theme.palette.common.white,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const changeSearchValue = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const goTo = (destiny) => {
    history.push(destiny);
  };

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        style={{ zIndex: 1302 }}
        className={classes.appBar}
      >
        <Grid
          className={classes.navBar}
          container
          direction="row"
          justify={matchesXS ? "center" : "space-between"}
          alignItems="center"
        >
          <Toolbar
            container
            component={Grid}
            direction={matchesSM ? "column" : "row"}
            justify="center"
            alignItems="center"
            style={{ margin: "0 10px" }}
            disableGutters
            className={classes.toolbar}
          >
            <Grid
              className={classes.icon}
              component={Link}
              to="/"
              style={{ textDecoration: "none" }}
              variant="h6"
              container
              justify="center"
              direction="row"
            >
              <Icon />
              <Typography variant="h4">MovieDB</Typography>
            </Grid>

            <Button
              component={Link}
              to="/favorites"
              variant="outlined"
              color="secondary"
              style={{
                padding: "15px 10px",
                marginRight: "10px",
                marginLeft: "auto",
              }}
            >
              Favoritos ({props.favoritesLength})
            </Button>
            <Hidden xsDown>
              <TextField
                placeholder="Busque um filme"
                variant="filled"
                color="secondary"
                style={{
                  marginRight: "15px",
                  maxWidth: matchesXS ? "150px" : "",
                }}
                value={searchQuery}
                onKeyPress={(event) =>
                  event.key === "Enter" ? goTo(`/search?q=${searchQuery}`) : ""
                }
                onChange={changeSearchValue}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={
                  searchQuery
                    ? () => goTo(`/search?q=${searchQuery}`)
                    : () => {}
                }
              >
                <Search />
              </Button>
            </Hidden>
          </Toolbar>
        </Grid>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
