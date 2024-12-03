'use client';

// Import necessary React hooks and utilities
import { createContext, useContext, useState } from 'react';

// Create a new context for quiz state management
const QuizContext = createContext();

// Custom hook for accessing quiz context throughout the application
export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}

// Quiz Provider component that wraps the application and provides quiz state
export function QuizProvider({ children }) {
  // State for managing quiz data and user interaction
  const [questions, setQuestions] = useState([]); // Stores quiz questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks current question
  const [userAnswers, setUserAnswers] = useState([]); // Stores user's answers
  const [score, setScore] = useState(0); // Tracks user's score
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch new quiz questions from the API
  const startQuiz = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch 5 computer science questions from the Open Trivia DB
      const response = await fetch(
        '/api/questions?amount=5&category=18&type=multiple'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Validate API response
      if (data.response_code === 0 && Array.isArray(data.results)) {
        // Reset quiz state for new attempt
        setQuestions(data.results);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setScore(0);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch questions');
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle user's answer submission
  const submitAnswer = (answer) => {
    // Only proceed if answer hasn't been submitted for current question
    if (userAnswers[currentQuestionIndex] === undefined) {
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentQuestionIndex] = answer;
      setUserAnswers(newUserAnswers);

      // Update score if answer is correct
      if (answer === questions[currentQuestionIndex].correct_answer) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  // Function to move to the next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Context value object containing all quiz state and functions
  const value = {
    questions,          // Array of quiz questions
    currentQuestionIndex, // Current question number (0-based)
    userAnswers,        // Array of user's submitted answers
    score,             // User's current score
    isLoading,         // Loading state for API calls
    error,            // Error state for API calls or other errors
    startQuiz,        // Function to start/restart quiz
    submitAnswer,     // Function to submit an answer
    nextQuestion,     // Function to move to next question
  };

  // Provide quiz context to child components
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}
