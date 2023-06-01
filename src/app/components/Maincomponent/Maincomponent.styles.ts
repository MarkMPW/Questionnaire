import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

export const useStyles = makeStyles({
    paperD: {
      padding: "24px",
      boxShadow: "0px 4px 8px rgba(8, 29, 31, 0.1)",
      borderBottom: "1px solid grey",
      borderColor: "rgba(0, 0, 0, 0.5)",
    },
    paperQ: {
      padding: "24px",
      boxShadow: "0px 4px 8px rgba(8, 29, 31, 0.1)",
      borderBottom: "1px solid grey",
    },
    paperAQ: {
      padding: "24px",
      boxShadow: "0px 4px 8px rgba(8, 29, 31, 0.1)",
    },
    helperError: {
      color: "red",
      borderColor: "red",
    },
    helperErrorC: {
      color: "red",
      borderColor: "red",
      marginLeft: "53px",
      position: "absolute",
    },
    helperCorrect: {
      marginLeft: "55px",
      position: "absolute",
      fontWeight: "bold",
    },
    lineBox: {
      border: "1px solid grey",
      borderColor: grey[400],
      margin: "25px 0px",
    },
    boxQ: {
      display: "flex",
      marginTop: "42px",
      alignItems: "center",
    },
    dupStarIcon: {
      color: "#00040C",
      fontSize: "14px",
      marginRight: "26px",
    },
    addQStarIcon: {
      border: "1px solid grey",
      width: "100%",
      color: "#FF5C00",
      borderColor: "#FF5C00",
      padding: "13px 0px",
    },
  });