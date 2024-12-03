'use client';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

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
      <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-xl">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-xl text-red-600">Error: {error}</div>
      </main>
    );
  }

  if (!questions || questions.length === 0) return null;

  const handleTakeQuizAgain = async () => {
    await startQuiz();
    router.push('/quiz');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'hard':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <main className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-3xl mx-auto mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
        >
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Quiz Results
          </h1>
          
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-48 h-48 mb-6">
              <div className="w-full h-full rounded-full bg-gray-100 absolute"></div>
              <div 
                className="w-full h-full rounded-full absolute"
                style={{
                  background: `conic-gradient(#4F46E5 ${percentage}%, #E5E7EB ${percentage}%)`,
                  transition: 'all 1s ease-out'
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-5xl font-bold text-gray-800">{percentage}%</span>
                <span className="text-xl font-semibold text-gray-600">Score</span>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-gray-800 mb-2">
                {getGrade(percentage).grade}
              </p>
              <p className="text-xl text-gray-600">
                {getGrade(percentage).message}
              </p>
            </div>

            <div className="flex gap-4 w-full max-w-md">
              <button
                onClick={handleTakeQuizAgain}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/')}
                className="flex-1 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 text-lg font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                Home
              </button>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  getDifficultyColor(question.difficulty).replace('text-', 'bg-').replace('600', '100')
                } ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {question.category}
                </span>
              </div>
              
              <h3
                className="text-xl font-semibold mb-4 text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: question.question }}
              />
              
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-lg flex-1">
                    <span className="font-medium text-gray-700">Correct Answer: </span>
                    <span
                      className="text-green-600 font-medium"
                      dangerouslySetInnerHTML={{ __html: question.correct_answer }}
                    />
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    userAnswers[index] === question.correct_answer ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <p className="text-lg flex-1">
                    <span className="font-medium text-gray-700">Your Answer: </span>
                    <span
                      className={`font-medium ${
                        userAnswers[index] === question.correct_answer
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                      dangerouslySetInnerHTML={{ __html: userAnswers[index] }}
                    />
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
