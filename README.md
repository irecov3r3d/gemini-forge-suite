# Gemini Forge Suite

Gemini Forge Suite is a modern, full-stack AI platform designed to streamline creative workflows, web architecture, and marketing automation using the power of Google Gemini AI. Built with React 19, Vite, and Framer Motion, it provides a high-performance, interactive interface for multi-disciplinary AI tasks.

## 🚀 Features

- **Prompt Lab**: Experiment with and refine AI prompts for maximum output quality.
- **Web Architect**: Intelligent assistance for designing and prototyping web structures.
- **Creative Studio**: A dedicated space for AI-assisted content creation and visual ideation.
- **Marketing Hub**: Automated tools for generating copy, strategy, and campaign assets.
- **Workflow Engine**: Connect multiple AI processes into a seamless, automated pipeline.
- **Data Visualization**: Integrated analytics using Recharts for tracking AI performance and metrics.

## 🛠️ Tech Stack

- **Frontend**: React 19 (TypeScript), Vite, Tailwind CSS
- **AI Engine**: Google Generative AI (Gemini SDK)
- **Animations**: Motion (formerly Framer Motion)
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, react-markdown

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/gemini-forge-suite.git
   cd gemini-forge-suite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory based on `.env.example` and add your Google Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server on port 3000.
- `npm run build`: Compiles the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs TypeScript checks to ensure code quality.

## 📂 Project Structure

- `src/services/geminiService.ts`: Core logic for interacting with the Google Generative AI API.
- `src/components/`: Modular UI components for each functional hub (PromptLab, MarketingHub, etc.).
- `src/lib/utils.ts`: Utility functions for Tailwind class merging and styling.

## 📄 License

This project is private and intended for internal use. Refer to the license terms in the package metadata.