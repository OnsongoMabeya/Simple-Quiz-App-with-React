'use client';

import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Chip
} from '@mui/material';
import {
  Timer as TimerIcon,
  Lightbulb as LightbulbIcon,
  NavigateNext as NavigateNextIcon,
  HelpOutline as HelpOutlineIcon
} from '@mui/icons-material';

export default function Quiz() {
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    submitAnswer,
    nextQuestion,
    score
  } = useQuiz();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showHint, setShowHint] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!questions || questions.length === 0) {
      router.push('/');
    }
  }, [questions, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          nextQuestion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    submitAnswer(answer);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setTimeLeft(30);
    setShowHint(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      router.push('/result');
    }
  };

  if (!questions || questions.length === 0) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <Card elevation={3}>
          <CardContent>
            <Box mb={3}>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Chip
                  label={`Question ${currentQuestionIndex + 1}/${questions.length}`}
                  color="primary"
                  variant="filled"
                />
                <Chip
                  label={currentQuestion.difficulty.toUpperCase()}
                  color={
                    currentQuestion.difficulty === 'easy' ? 'success' :
                    currentQuestion.difficulty === 'medium' ? 'warning' : 'error'
                  }
                  variant="filled"
                />
                <Box flexGrow={1} />
                <Stack direction="row" spacing={1} alignItems="center">
                  <TimerIcon color={timeLeft <= 10 ? "error" : "primary"} />
                  <Typography
                    variant="h6"
                    color={timeLeft <= 10 ? "error" : "text.primary"}
                    sx={{ minWidth: 40 }}
                  >
                    {timeLeft}s
                  </Typography>
                </Stack>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(timeLeft / 30) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: timeLeft <= 10 ? 'error.main' : 'primary.main',
                  }
                }}
              />
            </Box>

            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              sx={{ 
                fontWeight: 600,
                color: 'text.primary',
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                lineHeight: 1.4,
                mb: 3
              }}
              dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            />

            <Stack spacing={2} my={4}>
              {currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer)
                .sort()
                .map((answer, index) => (
                  <motion.div
                    key={answer}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      fullWidth
                      variant={selectedAnswer === answer ? "contained" : "outlined"}
                      onClick={() => handleAnswerSelect(answer)}
                      sx={{
                        py: 2,
                        px: 3,
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        borderRadius: 2,
                        backgroundColor: selectedAnswer === answer ? 'primary.main' : 'background.paper',
                        borderColor: selectedAnswer === answer ? 'primary.main' : 'grey.300',
                        '&:hover': {
                          backgroundColor: selectedAnswer === answer ? 'primary.dark' : 'grey.50',
                          borderColor: selectedAnswer === answer ? 'primary.dark' : 'primary.main',
                        },
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      <Typography
                        variant="body1"
                        dangerouslySetInnerHTML={{ __html: answer }}
                        sx={{
                          color: selectedAnswer === answer ? 'white' : 'text.primary',
                          fontWeight: selectedAnswer === answer ? 500 : 400,
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                          lineHeight: 1.5
                        }}
                      />
                    </Button>
                  </motion.div>
                ))}
            </Stack>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                startIcon={<HelpOutlineIcon />}
                onClick={() => setShowHint(true)}
                disabled={showHint}
              >
                Show Hint
              </Button>

              <Button
                variant="contained"
                endIcon={<NavigateNextIcon />}
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </Box>

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      mt: 3,
                      backgroundColor: 'info.light',
                      borderColor: 'info.main'
                    }}
                  >
                    <CardContent>
                      <Typography color="info.contrastText">
                        <strong>Hint:</strong> Look for keywords in the question and consider the context.
                        The answer might be related to {currentQuestion.category}.
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}
