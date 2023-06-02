import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  TextField,
  IconButton,
  FormHelperText,
  Button,
  Radio,
  FormControl,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { questionnaireType, question, choice } from "../../page";
import { useStyles } from "./Maincomponent.styles";

export function Maincomponent({
  setQuestionnaire,
  questionnaire,
}: {
  setQuestionnaire: React.Dispatch<React.SetStateAction<questionnaireType>>;
  questionnaire: questionnaireType;
}) {
  const addQuestion = () => {
    setQuestionnaire((prev) => {
      const updatedQuestion = [...prev.questions];
      const newQuestion = {
        question: "",
        errorQ: false,
        showDelete: false,
        choices: [
          {
            isCheck: true,
            choiceDesc: "",
            errorC: false,
          },
          {
            isCheck: false,
            choiceDesc: "",
            errorC: false,
          },
        ],
      };
      updatedQuestion.push(newQuestion);

      return {
        ...prev,
        questions: updatedQuestion,
      };
    });
  };

  const deleteQuestion = (questionIndex: number) => {
    setQuestionnaire((prev) => {
      const questions = prev.questions;
      if (questions.length === 1) {
        return prev;
      } else {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(questionIndex, 1);
        return {
          ...prev,
          questions: updatedQuestions,
        };
      }
    });
  };

  const addChoice = (questionIndex: number) => {
    setQuestionnaire((prevQuestionnaire) => {
      const updatedQuestions = [...prevQuestionnaire.questions];
      const newChoice = {
        isCheck: false,
        choiceDesc: "",
        errorC: false,
      };
      updatedQuestions[questionIndex].choices.push(newChoice);
      return {
        ...prevQuestionnaire,
        questions: updatedQuestions,
      };
    });
  };

  const deleteChoice = (questionIndex: number, choiceIndex: number) => {
    setQuestionnaire((prevChoice) => {
      const updatedQuestions = [...prevChoice.questions];
      const updatedChoices = [...updatedQuestions[questionIndex].choices];

      const deletingCurrentChoice = updatedChoices[choiceIndex].isCheck;

      if (updatedChoices.length === 1) {
        return prevChoice;
      } else {
        updatedChoices.splice(choiceIndex, 1);

        if (deletingCurrentChoice) {
          let newCheckedChoice = -1;
          for (let i = choiceIndex; i < updatedChoices.length; i++) {
            if (updatedChoices[i].isCheck !== true) {
              newCheckedChoice = i;
              break;
            }
          }

          if(newCheckedChoice !== -1){
            updatedChoices[newCheckedChoice].isCheck = true;
          } else{
            updatedChoices[0].isCheck = true
          }
        }

        updatedQuestions[questionIndex].choices = updatedChoices;
        return {
          ...prevChoice,
          questions: updatedQuestions,
        };
      }
    });
  };

  const duplicate = (questionIndex: number) => {
    setQuestionnaire((prev) => {
      const updatedQuestions = [...prev.questions];
      const previousQuestion = updatedQuestions[questionIndex];
      const duplicatedQuestion = {
        ...previousQuestion,
        errorQ: false,
        choices: previousQuestion.choices.map((choice) => ({
          ...choice,
          errorC: false,
        })),
      };
      // start at index question + 1 and remove 0 index after that insert duplicateQuestion
      updatedQuestions.splice(
        questionIndex + updatedQuestions.length,
        0,
        duplicatedQuestion
      );

      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  const onChangeDetail = (value: string) => {
    questionnaire.questionDetails = value;
    if (questionnaire.questionDetails.trim() !== "") {
      setQuestionnaire((prevQuestionD) => ({
        ...prevQuestionD,
        errorD: false,
      }));
    } else {
      setQuestionnaire((prevQuestionD) => ({
        ...prevQuestionD,
        questionDetails: value,
      }));
    }
  };

  const onChangeQuestion = (value: string, questionIndex: number) => {
    setQuestionnaire((prevQuestion) => {
      const updatedQuestions = [...prevQuestion.questions];
      const updatedQuestion = { ...updatedQuestions[questionIndex] };

      updatedQuestion.question = value;
      if (updatedQuestion.question.trim() !== "") {
        updatedQuestion.errorQ = false;
      }

      updatedQuestions[questionIndex] = updatedQuestion;

      return {
        ...prevQuestion,
        questions: updatedQuestions,
      };
    });
  };

  const onChangeChoice = (
    value: string,
    questionIndex: number,
    choiceIndex: number
  ) => {
    setQuestionnaire((prevQuestion) => {
      const updatedQuestions = [...prevQuestion.questions];
      const updatedQuestion = { ...updatedQuestions[questionIndex] };
      const updatedChoices = [...updatedQuestion.choices];
      const updatedChoice = { ...updatedChoices[choiceIndex] };

      updatedChoice.choiceDesc = value;

      if (updatedChoice.choiceDesc.trim() !== "") {
        updatedChoice.errorC = false;
      }

      updatedChoices[choiceIndex] = updatedChoice;
      updatedQuestion.choices = updatedChoices;
      updatedQuestions[questionIndex] = updatedQuestion;

      return {
        ...prevQuestion,
        questions: updatedQuestions,
      };
    });
  };

  const onChangeRadio = (questionIndex: number, choiceIndex: number) => {
    setQuestionnaire((prevQuestionnaire) => {
      const updatedQuestions = [...prevQuestionnaire.questions];
      const updatedChoices = [...updatedQuestions[questionIndex].choices];

      updatedChoices.forEach((choice, index) => {
        choice.isCheck = index === choiceIndex;
      });

      updatedQuestions[questionIndex].choices = updatedChoices;

      return {
        ...prevQuestionnaire,
        questions: updatedQuestions,
      };
    });
  };

  const classes = useStyles();
  return (
    <>
      <Paper className={classes.paperD}>
        <Typography variant="h6" fontWeight={600}>
          Questionaire Detail
        </Typography>
        <Box mt="25px">
          <TextField
            required
            id="outline-required"
            label="Name"
            fullWidth={true}
            name="name"
            error={questionnaire.errorD}
            value={questionnaire.questionDetails}
            onChange={(e) => onChangeDetail(e.target.value)}
          />
          {questionnaire.errorD && (
            <FormHelperText className={classes.helperError}>
              Please fill in this option
            </FormHelperText>
          )}
        </Box>
      </Paper>

      {/* START QUESTION */}
      {questionnaire.questions.map(
        (question: question, questionIndex: number) => (
          <Paper className={classes.paperQ} key={`questions-${questionIndex}`}>
            <Typography variant="h6" fontWeight={600} mb="26px">
              Question {questionIndex + 1}
            </Typography>
            <TextField
              required
              id="outline-required"
              label="Question"
              name="question"
              error={question.errorQ}
              fullWidth={true}
              value={question.question}
              onChange={(e) => onChangeQuestion(e.target.value, questionIndex)}
            />
            {question.errorQ && (
              <FormHelperText className={classes.helperError}>
                Please input this option
              </FormHelperText>
            )}

            {/* Choices */}
            {question.choices.map((choice: choice, choiceIndex: number) => (
              <Box key={`choices-${choiceIndex}`}>
                <Box className={classes.boxQ}>
                  <FormControl>
                    {/*use onChange to check if the radio is checked or not HINT: use array loop through the choice if the current radio is false change it to true and change all of array to false*/}
                    <Box mr="20px">
                      <Radio
                        name="isCheck"
                        checked={choice.isCheck}
                        onChange={() =>
                          onChangeRadio(questionIndex, choiceIndex)
                        }
                        checkedIcon={
                          <CheckCircleIcon sx={{ color: "#00C62B " }} />
                        }
                      />
                    </Box>
                  </FormControl>
                  <TextField
                    required
                    id="outline-required"
                    label="Description"
                    fullWidth={true}
                    name="choice"
                    error={choice.errorC}
                    value={choice.choiceDesc}
                    onChange={(e) =>
                      onChangeChoice(e.target.value, questionIndex, choiceIndex)
                    }
                  />
                  <IconButton
                    sx={{
                      display:
                        questionnaire.questions[questionIndex].choices
                          .length === 1
                          ? "none"
                          : "inline-flex",
                      marginLeft: "10px",
                    }}
                    onClick={() => deleteChoice(questionIndex, choiceIndex)}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Box>
                {choice.errorC && (
                  <FormHelperText className={classes.helperErrorC}>
                    Please input this option
                  </FormHelperText>
                )}
                {choice.isCheck &&
                  !choice.errorC &&
                  choice.choiceDesc.trim() !== "" && (
                    <FormHelperText className={classes.helperCorrect}>
                      This is the correct answer
                    </FormHelperText>
                  )}
              </Box>
            ))}

            <Box mt="26px">
              <Button
                startIcon={<AddIcon />}
                sx={{ color: "#FF5C00" }}
                onClick={() => addChoice(questionIndex)}
              >
                ADD CHOICE
              </Button>
              <Box className={classes.lineBox}></Box>
              <Box>
                <Button
                  startIcon={<ContentCopyIcon />}
                  className={classes.dupStarIcon}
                  onClick={() => duplicate(questionIndex)}
                >
                  DUPLICATE
                </Button>
                <Button
                  startIcon={<DeleteOutlinedIcon />}
                  sx={{
                    display:
                      questionnaire.questions.length === 1
                        ? "none"
                        : "inline-flex",
                    color: "#00040C",
                    fontSize: "14px",
                  }}
                  onClick={() => deleteQuestion(questionIndex)}
                >
                  DELETE
                </Button>
              </Box>
            </Box>
          </Paper>
        )
      )}

      {/* ADD QUESTION */}
      <Paper className={classes.paperAQ}>
        <Button
          startIcon={<AddIcon />}
          className={classes.addQStarIcon}
          onClick={addQuestion}
        >
          ADD QUESTION
        </Button>
      </Paper>
    </>
  );
}
