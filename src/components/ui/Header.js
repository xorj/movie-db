import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  useMediaQuery,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

/*Icones*/
import { LocalMovies as Icon } from "@material-ui/icons";

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
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  //Melhora a performance em iOS
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleTabClick = (event, value) => {
    props.setSelectedLink(value);
  };

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        style={{ zIndex: 1302 }}
        className={classes.appBar}
      >
        <Grid container direction="row" justify={"flex-start"}>
          <Typography
            className={classes.icon}
            variant="h6"
            container
            component={Grid}
            justify="center"
            direction="row"
          >
            <Grid
              to="/home"
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
          <Toolbar disableGutters className={classes.toolbar}></Toolbar>
        </Grid>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
