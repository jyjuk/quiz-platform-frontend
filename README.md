# Quiz Platform - Frontend

React + TypeScript + Material UI application for Quiz Management System.

## 🚀 Getting Started

### Prerequisites

- Node.js 22.12+ (or 20.19+)
- npm 10+

### Installation

1. Clone the repository:
```bash
git clone git@github.com:jyjuk/quiz-platform-frontend.git
cd quiz-platform-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.sample`:
```bash
cp .env.sample .env
```

4. Fill in the `.env` file with your configuration values.

### Running the Application

**Development mode:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

**Production build:**
```bash
npm run build
npm run preview
```

### Code Formatting
```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

## 📁 Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── store/          # Global state management
├── api/            # API services
├── utils/          # Helper functions
├── types/          # TypeScript type definitions
└── constants/      # Application constants
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Material UI** - Component library
- **React Router** - Routing
- **Axios** - HTTP client

## 📝 Environment Variables

See `.env.sample` for required environment variables.

## 🔗 Backend API

API Documentation: `http://localhost:8000/docs`
```