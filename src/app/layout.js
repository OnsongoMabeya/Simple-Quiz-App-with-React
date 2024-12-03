import { Inter } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz App",
  description: "Test your computer science knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QuizProvider>{children}</QuizProvider>
      </body>
    </html>
  );
}
