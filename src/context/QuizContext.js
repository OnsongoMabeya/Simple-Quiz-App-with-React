'use client';
import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const startQuiz = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(
        '/api/questions?amount=5&category=18&type=multiple'
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.response_code === 0 && Array.isArray(data.results)) {
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

  const submitAnswer = (answer) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newUserAnswers);

    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        userAnswers,
        score,
        isLoading,
        error,
        startQuiz,
        submitAnswer,
        nextQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
