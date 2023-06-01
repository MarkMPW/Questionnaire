"use client";
import React from "react";
import { AppBar, Box, Typography, Button } from "@mui/material";
import { questionnaireType } from "../../page";
import { useStyles } from "../App/App.style";

export const Appbar = ({
  handleSave,
  questionnaire,
  handleCancel,
}: {
  handleSave: () => void;
  questionnaire: questionnaireType;
  handleCancel: () => void;
}) => {
  const classes = useStyles();
  return (
    <AppBar position="static" elevation={0}>
      <Box>
        <Typography
          variant="h3"
          className={classes.topAppbar}
        >
          🦊 Foxbith Questionnaire
        </Typography>
      </Box>
      <Box
        className={classes.bottomAppbar}
      >
        <Box p="14px 14px 14px 24px">
          <Button
            className={classes.btnCancel}
            onClick={handleCancel}
          >
            CANCEL
          </Button>
          <Button
            className={classes.btnSave}
            onClick={handleSave}
          >
            SAVE
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
};
