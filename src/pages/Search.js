import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";




const useStyles = makeStyles((theme) => ({}));

export default function Search(props) {
    const theme = useTheme();
    const classes = useStyles();
    return (<Grid>
        <Typography align="center" variant="h2">
            /busca
        </Typography>
    </Grid>)

}