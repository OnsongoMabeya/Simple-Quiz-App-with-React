'use client';

import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Home as HomeIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

export default function Result() {
  const router = useRouter();
  const { questions, userAnswers, score, startQuiz, isLoading, error } = useQuiz();

  const percentage = Math.round((score / questions.length) * 100);

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A', message: 'Outstanding!' };
    if (percentage >= 80) return { grade: 'B', message: 'Great job!' };
    if (percentage >= 70) return { grade: 'C', message: 'Good effort!' };
    if (percentage >= 60) return { grade: 'D', message: 'Keep practicing!' };
    return { grade: 'F', message: 'Try again!' };
  };

  useEffect(() => {
    if (!isLoading && questions.length === 0 && !error) {
      router.push('/');
    }
  }, [questions, router, isLoading, error]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!questions || questions.length === 0) return null;

  const handleTakeQuizAgain = async () => {
    await startQuiz();
    router.push('/quiz');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #3f51b5 30%, #f50057 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold'
              }}
            >
              Quiz Results
            </Typography>

            <Box sx={{ position: 'relative', display: 'inline-flex', my: 4 }}>
              <CircularProgress
                variant="determinate"
                value={100}
                size={160}
                thickness={4}
                sx={{ color: 'grey.200' }}
              />
              <CircularProgress
                variant="determinate"
                value={percentage}
                size={160}
                thickness={4}
                sx={{
                  color: 'primary.main',
                  position: 'absolute',
                  left: 0,
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h4" component="div" color="text.primary">
                  {percentage}%
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Score
                </Typography>
              </Box>
            </Box>

            <Typography variant="h4" gutterBottom color="primary">
              {getGrade(percentage).grade}
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              {getGrade(percentage).message}
            </Typography>

            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={handleTakeQuizAgain}
                sx={{
                  background: 'linear-gradient(45deg, #3f51b5 30%, #f50057 90%)',
                  color: 'white',
                  px: 4
                }}
              >
                Try Again
              </Button>
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={() => router.push('/')}
              >
                Home
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {questions.map((question, index) => (
            <Grid item xs={12} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent>
                    <Box display="flex" gap={1} mb={2}>
                      <Chip
                        label={question.difficulty.toUpperCase()}
                        color={
                          question.difficulty === 'easy' ? 'success' :
                          question.difficulty === 'medium' ? 'warning' : 'error'
                        }
                        size="small"
                      />
                      <Chip
                        label={question.category}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </Box>

                    <Typography
                      variant="h6"
                      gutterBottom
                      dangerouslySetInnerHTML={{ __html: question.question }}
                    />

                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" flexDirection="column" gap={1}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircleIcon color="success" />
                        <Typography>
                          <strong>Correct Answer: </strong>
                          <span dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        {userAnswers[index] === question.correct_answer ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )}
                        <Typography>
                          <strong>Your Answer: </strong>
                          <span dangerouslySetInnerHTML={{ __html: userAnswers[index] || 'No answer'}} />
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
}
