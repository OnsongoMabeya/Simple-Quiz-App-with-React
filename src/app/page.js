'use client';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/context/QuizContext';
import { motion } from 'framer-motion';
import { FaBrain, FaTrophy, FaClock } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();
  const { startQuiz } = useQuiz();

  const features = [
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: "Test Your Knowledge",
      description: "Challenge yourself with questions across various computer science topics"
    },
    {
      icon: <FaTrophy className="w-8 h-8" />,
      title: "Get Instant Results",
      description: "Receive detailed feedback and scores immediately after completion"
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      title: "Quick & Engaging",
      description: "5 carefully selected questions to keep you focused and motivated"
    }
  ];

  const handleStartQuiz = async () => {
    await startQuiz();
    router.push('/quiz');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 mb-16"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Computer Science Quiz
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Challenge your computer science knowledge with our interactive quiz! Answer questions 
            across different topics and difficulty levels.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartQuiz}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg 
                     text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 
                     transform hover:-translate-y-0.5"
          >
            Start Quiz Now
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How It Works
          </h2>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">1</div>
              <span>Start Quiz</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">2</div>
              <span>Answer Questions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">3</div>
              <span>Get Results</span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
