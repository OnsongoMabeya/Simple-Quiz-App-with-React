'use client';
// Import necessary dependencies
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaLightbulb, FaArrowRight } from 'react-icons/fa';

export default function Quiz() {
  // Initialize router for navigation
  const router = useRouter();
  
  // Get quiz state and functions from context
  const {
    questions,
    currentQuestionIndex,
    userAnswers,
    submitAnswer,
    nextQuestion,
    isLoading,
    error
  } = useQuiz();

  // Local state for timer and hint functionality
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [showHint, setShowHint] = useState(false);

  // Effect to redirect if no questions are loaded
  useEffect(() => {
    if (!isLoading && questions.length === 0 && !error) {
      router.push('/');
    }
  }, [questions, router, isLoading, error]);

  // Timer effect - counts down from 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext(); // Auto-advance when time runs out
          return 30; // Reset timer
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timer on unmount
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  // Reset timer and hide hint when question changes
  useEffect(() => {
    setTimeLeft(30);
    setShowHint(false);
  }, [currentQuestionIndex]);

  // Loading state UI
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-semibold text-blue-600"
        >
          Loading questions...
        </motion.div>
      </main>
    );
  }

  // Error state UI
  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-xl text-red-600">Error: {error}</div>
      </main>
    );
  }

  // Return null if no questions available
  if (!questions || questions.length === 0) return null;

  // Get current question and randomize answer options
  const currentQuestion = questions[currentQuestionIndex];
  const answers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    submitAnswer(answer);
  };

  // Handle next question or finish quiz
  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      router.push('/result');
    } else {
      nextQuestion();
    }
  };

  // Get appropriate color for difficulty badge
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'hard':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Generate hint based on question category and answer length
  const getHint = () => {
    const correctAnswer = currentQuestion.correct_answer;
    return `Think about ${currentQuestion.category} concepts. The answer is related to ${correctAnswer.length} characters long.`;
  };

  return (
    <main className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-3xl mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative"
        >
          {/* Timer Display */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg">
            <div className="flex items-center space-x-2">
              <FaClock className="text-blue-600" />
              <span className="font-semibold text-gray-700">{timeLeft}s</span>
            </div>
          </div>

          <div className="mb-8">
            {/* Progress Bar */}
            <div className="h-2 w-full bg-gray-100 rounded-full mb-4">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question Info Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm font-medium text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
              <div className="flex gap-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                  {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {currentQuestion.category}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <motion.h2
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            />
          </div>

          {/* Answer Options with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {answers.map((answer, index) => {
                const letter = String.fromCharCode(65 + index); // Convert 0,1,2,3 to A,B,C,D
                const isSelected = userAnswers[currentQuestionIndex] === answer;
                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(answer)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 flex items-center space-x-4
                      ${isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    disabled={userAnswers[currentQuestionIndex] !== undefined}
                  >
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                      {letter}
                    </span>
                    <span
                      className="flex-1 text-left"
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Controls - Hint and Next Button */}
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors"
            >
              <FaLightbulb />
              <span>Hint</span>
            </button>

            {userAnswers[currentQuestionIndex] !== undefined && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                          text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span>{currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}</span>
                <FaArrowRight />
              </motion.button>
            )}
          </div>

          {/* Hint Panel with Animation */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700"
              >
                <p>{getHint()}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
