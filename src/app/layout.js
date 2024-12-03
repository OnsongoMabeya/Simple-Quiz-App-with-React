// Import global styles and context providers
import { Inter } from "next/font/google";
import '@/styles/globals.css';
import { QuizProvider } from '@/context/QuizContext';
import ThemeRegistry from '@/components/ThemeRegistry';

// Create an instance of the Inter font with latin subset
const inter = Inter({ subsets: ["latin"] });

// Metadata configuration for the application
export const metadata = {
  title: 'Computer Science Quiz',
  description: 'Test your knowledge with our interactive computer science quiz!',
};

// Root layout component that wraps all pages
// This component provides:
// 1. Global styles through globals.css
// 2. Quiz state management through QuizProvider
// 3. HTML structure with appropriate lang attribute
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <QuizProvider>
            {children}
          </QuizProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
