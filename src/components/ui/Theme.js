import { createMuiTheme } from "@material-ui/core/styles";

const green = "#00b341";
const white = "#f1f1f1";
const black = "#02020A";

export default createMuiTheme({
  palette: {
    common: {
      green,
      white,
      black,
    },
    primary: {
      main: green,
    },
    secondary: {
      main: white,
    },
  },
  typography: {
    pageHeader: {
      fontFamily: "Lato",
      fontWeight: 700,
      textTransform: "none",
      fontSize: "1rem",
      color: green,
    },
    h2: {
      fontFamily: "Roboto",
      fontSize: "1.5rem",
      fontWeight: 500,
      color: black,
    },
    h4: {
      fontFamily: "Lato",
      fontSize: "1.2rem",
      fontWeight: 400,
    },
    body1: {
      fontFamily: "Lato",
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
});