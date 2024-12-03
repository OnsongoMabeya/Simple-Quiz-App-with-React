'use client';

import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';
import { motion } from 'framer-motion';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  CardActions 
} from '@mui/material';
import {
  QuestionMark as QuestionMarkIcon,
  Timer as TimerIcon,
  EmojiEvents as EmojiEventsIcon,
  PlayArrow as PlayArrowIcon
} from '@mui/icons-material';

export default function Home() {
  const router = useRouter();
  const { startQuiz } = useQuiz();

  const handleStartQuiz = async () => {
    await startQuiz();
    router.push('/quiz');
  };

  const features = [
    {
      icon: <QuestionMarkIcon sx={{ fontSize: 40 }} />,
      title: 'Dynamic Questions',
      description: 'Test your knowledge with a variety of computer science questions'
    },
    {
      icon: <TimerIcon sx={{ fontSize: 40 }} />,
      title: 'Timed Challenges',
      description: '30 seconds per question to keep you on your toes'
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      title: 'Instant Results',
      description: 'Get immediate feedback on your performance'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #3f51b5 30%, #f50057 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Computer Science Quiz
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            Test your knowledge with our interactive quiz!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleStartQuiz}
            startIcon={<PlayArrowIcon />}
            sx={{
              background: 'linear-gradient(45deg, #3f51b5 30%, #f50057 90%)',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.2rem'
            }}
          >
            Start Quiz
          </Button>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2,
                        color: 'primary.main'
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
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
