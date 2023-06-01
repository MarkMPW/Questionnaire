import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    topAppbar: {
        backgroundColor: "white",
        color: "black",
        fontWeight: "500",
        fontSize: "24px",
        lineHeight: "32px",
        borderBottom: '1px solid grey',
        borderColor: "#9E9E9E",
        padding: "16px 0px 16px 24px",
    },
    bottomAppbar: {
        backgroundColor: "white",
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
    },
    btnCancel: {
        color: "#FF5C00",
        border: "1px solid",
        borderColor: "#FF5C00",
        marginRight: "10px",
        padding: "13px 13px",
    },
    btnSave: {
        color: "white",
        borderColor: "#FF5C00",
        backgroundColor: "#FF5C00",
        padding: "12px 72px",
        border: '1px solid #FF5C00',
        "&:hover": {
          color: "#FF5C00",
          boxSizing: "border-box",
        },
    },
})