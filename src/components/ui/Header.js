import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  useMediaQuery,
  Grid,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";


import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: "5rem",
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "1em",
  },
  tabs: {
    marginLeft: "auto",
    marginRight: "20px",
    height: "5rem",
    alignItems: "center",
  },

  tab: {
    textDecoration: "none",
    ...theme.typography.menu,
    minWidth: "8rem",
    height: "5rem",
    marginLeft: "20px",
    opacity: 0.7,
    fontWeight: 700,
  },
  selectedTab: {
    opacity: 1,
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
        <Grid
          container
          direction="row"
          justify={matchesMD ? "flex-end" : "center"}
        >
          <Toolbar disableGutters className={classes.toolbar}>
            {tabs}
          </Toolbar>
        </Grid>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}