# Computer Science Quiz Application

An interactive web-based quiz application built with Next.js that tests users' knowledge of computer science concepts. The application features a modern UI, smooth animations, and an engaging user experience.

## Features

- 🧠 Dynamic computer science questions from Open Trivia DB
- ⏱️ 30-second timer for each question
- 💡 Hint system for challenging questions
- 📊 Real-time progress tracking
- 🎯 Immediate feedback on answers
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 🏆 Detailed results and performance analysis

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: JavaScript/React
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **API**: Open Trivia Database

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone [your-repository-url]
   cd exam-app-webframeworks
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```bash
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── quiz/              # Quiz page
│   ├── result/            # Results page
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── context/               # React Context
│   └── QuizContext.js     # Quiz state management
└── styles/               # Global styles
    └── globals.css       # Global CSS
```

## Features in Detail

### Home Page

- Welcoming interface with animated components
- Feature highlights and instructions
- Quick start quiz button

### Quiz Page

- Dynamic question loading
- 30-second countdown timer
- Multiple choice answers with animations
- Progress indicator
- Hint system for assistance

### Results Page

- Comprehensive score breakdown
- Performance analysis
- Grade assignment
- Option to retry or return home
- Detailed review of all questions and answers

## Development

- Run development server:

  ```bash
  npm run dev
  ```

- Build for production:

  ```bash
  npm run build
  ```

- Start production server:

  ```bash
  npm start
  ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the quiz questions
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Icons](https://react-icons.github.io/react-icons/) for the icon set
