import React, { useState, useEffect } from "react";
import { Typography, Grid, IconButton } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';

/*Icones*/
import { ArrowBack as Left, ArrowForward as Right } from "@material-ui/icons/";

import instance from "../axios";



const useStyles = makeStyles((theme) => ({}));



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


    return (<Grid container direction="column">
        <Typography align="left" variant="h6">
            /home
        </Typography>
        <Grid>
            {movieList.map(movie => {
                <Typography>
                    {movie.title}
                </Typography>
            })}

        </Grid>        
        <Grid container className="pagination" direction="row" justify="center" alignItems="center">
            <IconButton
                onClick={previousPage}
                disabled={currentPage <= 1}>
                <Left sx={{ fontSize: 40 }} />
            </IconButton>
            <Typography className="current-page" variant="h5" >{currentPage}</Typography>
            <IconButton
                onClick={nextPage}
                disabled={currentPage >= totalPages}>
                <Right sx={{ fontSize: 40 }} />
            </IconButton>
        </Grid>

    </Grid>)

}