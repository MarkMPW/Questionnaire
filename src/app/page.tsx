"use client";

import Appbar from "./components/Appbar";
import { Container, Paper, Box } from "@mui/material";
import Maincomponent from "./components/Maincomponent";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";

export interface choice {
  isCheck: boolean;
  choiceDesc: string;
  errorC: boolean;
}

export interface question {
  question: string;
  errorQ: boolean;
  choices: choice[];
}

export interface questionnaireType {
  questionDetails: string;
  errorD: boolean;
  questions: question[];
}

export default function Home() {
  const [questionnaire, setQuestionnaire] = useState<questionnaireType>({
    questionDetails: "",
    errorD: false,
    questions: [
      {
        question: "",
        errorQ: false,
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
      },
      {
        question: "",
        errorQ: false,
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
      },
    ],
  });

  const handleSave = () => {
    let hasError = false;
    if (questionnaire.questionDetails.trim() === "") {
      setQuestionnaire((prev) => ({
        ...prev,
        errorD: true,
        hasError: true,
      }));
    } else {
      setQuestionnaire((prev) => ({
        ...prev,
        errorD: false,
        hasError: true,
      }));
    }

    const updatedQuestion = questionnaire.questions.map((q) => {
      let errorQ = false;
      const updatedChoice = q.choices.map((c) => {
        let errorC = false;
        if (c.choiceDesc.trim() === "") {
          (errorC = true), (hasError = true);
        }
        return {
          ...c,
          errorC,
        };
      });
      if (q.question.trim() === "") {
        errorQ = true;
        hasError = true;
      }
      return {
        ...q,
        errorQ,
        choices: updatedChoice,
      };
    });

    setQuestionnaire((prev) => ({
      ...prev,
      questions: updatedQuestion,
    }));

    if (!hasError) {
      setQuestionnaire((prev) => ({
        ...prev,
        errorD: false,
        hasError: false,
        questions: prev.questions.map((q) => ({
          ...q,
          errorQ: false,
          choices: q.choices.map((c) => ({
            ...c,
            errorC: false,
          })),
        })),
      }));
      console.log("Questionnaire", {
        questionDetails: questionnaire.questionDetails,
        questions: questionnaire.questions.map((q) => ({
          questions: q.question,
          choices: q.choices.map((c) => ({
            isCheck: c.isCheck,
            choiceDesc: c.choiceDesc
          }))
        }))
      })
    }
  };

  
  const handleCancel = () => {
    setQuestionnaire((prev) => ({
      questionDetails: "",
      errorD: false,
      questions: [
        {
          question: "",
          errorQ: false,
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
        },
        {
          question: "",
          errorQ: false,
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
        },
      ],
    }));
  };

  return (
    <Box
      component="form"
      sx={{ width: "100%", height: "100%", backgroundColor: grey[100] }}
    >
      <Appbar
        handleSave={handleSave}
        questionnaire={questionnaire}
        handleCancel={handleCancel}
      />
      <Box sx={{ padding: "24px" }}>
        <Maincomponent
          handleSave={handleSave}
          setQuestionnaire={setQuestionnaire}
          questionnaire={questionnaire}
          handleCancel={handleCancel}
        />
      </Box>
    </Box>
  );
}
