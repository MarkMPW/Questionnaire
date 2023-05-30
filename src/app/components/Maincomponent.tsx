import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  TextField,
  IconButton,
  FormHelperText,
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { grey } from "@mui/material/colors";
import { questionnaireType, question, choice } from "../page";

export default function Maincomponent({
  handleSave,
  setQuestionnaire,
  questionnaire,
  handleCancel,
}: {
  handleSave: () => void;
  setQuestionnaire: React.Dispatch<React.SetStateAction<questionnaireType>>;
  questionnaire: questionnaireType;
  handleCancel: () => void;
}) {
  const addQuestion = () => {
    setQuestionnaire((prev) => {
      const updatedQuestion = [...prev.questions];
      const newQuestion = {
        question: "",
        errorQ: false,
        choices: [
          {
            isCheck: false,
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

  const deleteChocie = (questionIndex: number, choiceIndex: number) => {
    setQuestionnaire((prevChocie) => {
      const updatedQuestion = [...prevChocie.questions];
      const updatedChoice = [...updatedQuestion[questionIndex].choices];
      if (updatedChoice.length === 1) {
        return prevChocie;
      } else {
        updatedChoice.splice(choiceIndex, 1);
        updatedQuestion[questionIndex].choices = updatedChoice;
        return {
          ...prevChocie,
          questions: updatedQuestion,
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
      updatedQuestions.splice(questionIndex + updatedQuestions.length, 0, duplicatedQuestion);
      // console.log(updatedQuestions);
      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  const onChangeDetail = (value: string) => {
    setQuestionnaire((prevQuestionnaire) => ({
      ...prevQuestionnaire,
      questionDetails: value,
    }));
  };

  const onChangeQuestion = (
    value: string,
    name: string,
    questionIndex: number,
    choiceIndex?: number
  ) => {
    setQuestionnaire((prevQuestion) => {
      const updatedQuestions = [...prevQuestion.questions];
      const updatedQuestion = { ...updatedQuestions[questionIndex] };

      if (name === "question") {
        updatedQuestion.question = value;
      } else if (name === "choice" && typeof choiceIndex === "number") {
        const updatedChoices = [...updatedQuestion.choices];
        const updatedChoice = { ...updatedChoices[choiceIndex] };
        updatedChoice.choiceDesc = value;
        updatedChoices[choiceIndex] = updatedChoice;
        updatedQuestion.choices = updatedChoices;
      }
      updatedQuestions[questionIndex] = updatedQuestion;
      const updatedQuestionnaire = {
        ...prevQuestion,
        questions: updatedQuestions,
      };
      return updatedQuestionnaire;
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

  return (
    <>
      <Paper sx={{ padding: "24px" }}>
        <Typography variant="h6" sx={{ fontWeight: "600" }}>
          Questionaire Detail
        </Typography>
        <Box sx={{ paddingTop: "25px" }}>
          <TextField
            required
            id="outline-required"
            label="Name"
            sx={{ width: "100%" }}
            name="name"
            error={questionnaire.errorD}
            value={questionnaire.questionDetails}
            onChange={(e) => onChangeDetail(e.target.value)}
          ></TextField>
          {questionnaire.errorD && (
            <FormHelperText sx={{ color: "red", borderColor: "red" }}>
              Please fill in this option
            </FormHelperText>
          )}
        </Box>
      </Paper>

      {/* START QUESTION */}
      {questionnaire.questions.map(
        (question: question, questionIndex: number) => (
          <Paper
            sx={{ padding: "24px", marginTop: "2px" }}
            key={`questions-${questionIndex}`}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "600", marginBottom: "26px" }}
            >
              Question {questionIndex + 1}
            </Typography>
            <TextField
              required
              id="outline-required"
              label="Question"
              name="question"
              error={question.errorQ}
              sx={{ width: "100%" }}
              value={question.question}
              onChange={(e) =>
                onChangeQuestion(e.target.value, e.target.name, questionIndex)
              }
            ></TextField>
            {question.errorQ && (
              <FormHelperText sx={{ color: "red", borderColor: "red" }}>
                Please input this option
              </FormHelperText>
            )}

            {/* Choices */}
            {question.choices.map((choice: choice, choiceIndex: number) => (
              <Box key={`choices-${choiceIndex}`}>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "42px",
                    alignItems: "center",
                  }}
                >
                  <FormControl>
                    {/*use onChange to check if the radio is checked or not HINT: use array loop through the choice if the current radio is false change it to true and change all of array to false*/}
                    <Radio
                      name="isCheck"
                      checked={choice.isCheck}
                      onChange={() => onChangeRadio(questionIndex, choiceIndex)}
                      sx={{ marginRight: "20px", }}
                      checkedIcon={<CheckCircleIcon sx={{ color: "#00C62B " }} />}
                    />
                  </FormControl>
                  <TextField
                    required
                    id="outline-required"
                    label="Description"
                    sx={{ width: "100%" }}
                    name="choice"
                    error={choice.errorC}
                    value={choice.choiceDesc}
                    onChange={(e) =>
                      onChangeQuestion(
                        e.target.value,
                        e.target.name,
                        questionIndex,
                        choiceIndex
                      )
                    }
                  ></TextField>
                  <IconButton
                    sx={{ marginLeft: "10px" }}
                    onClick={() => deleteChocie(questionIndex, choiceIndex)}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Box>
                {choice.errorC && (
                  <FormHelperText
                    sx={{
                      color: "red",
                      border: "red",
                      marginLeft: "53px",
                      position: "absolute",
                    }}
                  >
                    Please input this option
                  </FormHelperText>
                )}
                {choice.isCheck &&
                  !choice.errorC &&
                  choice.choiceDesc.trim() !== "" && (
                    <FormHelperText
                      sx={{
                        marginLeft: "55px",
                        position: "absolute", 
                        fontWeight: 'bold'
                      }}
                    >
                      This is the correct answer
                    </FormHelperText>
                  )}
              </Box>
            ))}

            <Box>
              <Button
                startIcon={<AddIcon />}
                sx={{ color: "#FF5C00", marginTop: "26px", marginLeft: "29px",}}
                onClick={() => addChoice(questionIndex)}
              >
                ADD CHOICE
              </Button>
              <Box
                sx={{ border: 1, borderColor: grey[400], margin: "25px 24px" }}
              ></Box>
              <Box sx={{ padding: "12px 24px" }}>
                <Button
                  startIcon={<ContentCopyIcon />}
                  sx={{
                    color: "#00040C",
                    fontSize: "14px",
                    marginRight: "26px",
                  }}
                  onClick={() => duplicate(questionIndex)}
                >
                  DUPLICATE
                </Button>
                <Button
                  startIcon={<DeleteOutlinedIcon />}
                  sx={{ color: "#00040C", fontSize: "14px" }}
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
      <Paper sx={{ padding: "24px" }}>
        <Button
          startIcon={<AddIcon />}
          sx={{
            border: 1,
            width: "100%",
            color: "#FF5C00",
            borderColor: "#FF5C00",
            padding: "13px 0px",
          }}
          onClick={addQuestion}
        >
          ADD QUESTION
        </Button>
      </Paper>
    </>
  );
}
