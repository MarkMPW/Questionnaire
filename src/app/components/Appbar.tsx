"use client";
import React, { MouseEventHandler, useState } from "react";
import { AppBar, Box, Typography, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { questionnaireType, question, choice } from "../page";

const Appbar = ({
  handleSave,
  questionnaire,
  handleCancel,
}: {
  handleSave: () => void;
  questionnaire: questionnaireType;
  handleCancel: () => void;
}) => {
  return (
    <AppBar position="static" elevation={0}>
      <Box>
        <Typography
          variant="h3"
          sx={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "500",
            fontSize: "24px",
            lineHeight: "32px",
            borderBottom: 1,
            borderColor: grey[500],
            padding: "16px 0px 16px 24px",
          }}
        >
          🦊 Foxbith Questionnaire
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Box sx={{ padding: "14px 14px 14px 24px" }}>
          <Button
            sx={{
              color: "#FF5C00",
              border: 1,
              borderColor: "#FF5C00",
              marginRight: "10px",
              padding: "13px 13px",
            }}
            onClick={handleCancel}
          >
            CANCEL
          </Button>
          <Button
            sx={{
              color: "white",
              border: 1,
              borderColor: "#FF5C00",
              backgroundColor: "#FF5C00",
              padding: "12px 72px",
              "&:hover": {
                color: "#FF5C00",
              },
            }}
            onClick={handleSave}
          >
            SAVE
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Appbar;
