// Import global styles and context providers
import { Inter } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext";

// Create an instance of the Inter font with latin subset
const inter = Inter({ subsets: ["latin"] });

// Metadata configuration for the application
export const metadata = {
  title: 'Computer Science Quiz App',
  description: 'Test your computer science knowledge with our interactive quiz!',
};

// Root layout component that wraps all pages
// This component provides:
// 1. Global styles through globals.css
// 2. Quiz state management through QuizProvider
// 3. HTML structure with appropriate lang attribute
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap all pages with QuizProvider to enable quiz state management */}
        <QuizProvider>
          {children}
        </QuizProvider>
      </body>
    </html>
  );
}
