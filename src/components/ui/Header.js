import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  TextField,
  Button,
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
    width: "200px",
    color: theme.palette.common.white,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState();

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
          justify="flex-start"
          alignItems="space-between"
        >
          <Typography
            className={classes.icon}
            variant="h6"
            container
            component={Grid}
            justify="center"
            direction="row"
          >
            <Grid
              to="/"
              component={Link}
              container
              alignItems="center"
              justify="center"
              direction="row"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Icon />
              MovieDB
            </Grid>
          </Typography>
          <Toolbar
            style={{ marginLeft: "auto", marginRight: "40px" }}
            disableGutters
            className={classes.toolbar}
          >
            <TextField
              placeholder="Busque um filme"
              variant="filled"
              style={{ marginRight: "15px" }}
              value={searchQuery}
              onKeyPress={(event) =>
                event.key === "Enter" ? goTo(`/search?${searchQuery}`) : ""
              }
              onChange={(event) => changeSearchValue(event)}
              placeholder="Search..."
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={
                searchQuery ? () => goTo(`/search?${searchQuery}`) : () => {}
              }
            >
              <Search />
            </Button>
          </Toolbar>
        </Grid>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
