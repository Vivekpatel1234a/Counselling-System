# Rank2Campus 🎓
### AI-Powered College Counselling & Rank Prediction System

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://rank2campus.netlify.app/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📖 Introduction
**Rank2Campus** is a sophisticated, end-to-send web application designed to streamline the complex college admission and career counselling process. By integrating state-of-the-art AI and predictive analytics, it empowers students to make data-driven decisions about their academic future.

## 🧠 Theoretical Background
In the traditional education system, career counselling often suffers from information asymmetry and manual processing delays. Rank2Campus addresses these challenges through several core pillars:

1.  **Predictive Analytics for Admissions**: Using historical admission data, the system implements a recommendation engine that matches a student's rank with potential college branches. This reduces the "trial and error" approach in choice filling.
2.  **AI-Driven Decision Support**: Leverages Large Language Models (LLMs) to provide personalized guidance. Unlike static FAQs, the AI Counsellor understands context, helping students explore career paths based on their interests and current academic standing.
3.  **Automated Document Processing (OCR)**: By utilizing Optical Character Recognition (OCR), the system automates the verification of academic transcripts (PDFs/Images), minimizing human error and accelerating the onboarding process.
4.  **Semantic Design Philosophy**: The interface is built on a semantic design system, ensuring accessibility and a consistent user experience across different themes (Dark/Light mode).

---

## ✨ Key Features

### 👨‍🎓 For Students
- **Smart Rank Predictor**: Instantly identify which  branch you are likely to get based on your rank.
- **AI Career Counsellor**: A 24/7 intelligent assistant powered by Google Gemini to answer complex career queries.
- **Document Verification**: Seamlessly upload and verify your academic documents using integrated OCR.
- **Interactive Choice Filling**: Lock your preferences and visualize your potential career path.
- **Modern Dashboard**: High-end UI with real-time updates and notifications.

### 👩‍💼 For Admins
- **Student Oversight**: Monitor student registrations and document status.
- **System Controls**: Manage admission cycles and global notifications.
- **Data Analytics**: Visualize admission trends and student preferences.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) & [Material UI 9](https://mui.com/) |
| **AI Integration** | [Google Generative AI (Gemini)](https://ai.google.dev/) |
| **Document Processing**| [Tesseract.js](https://tesseract.projectnaptha.com/) & [PDF.js](https://mozilla.github.io/pdf.js/) |
| **Routing** | [React Router 7](https://reactrouter.com/) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/rank2campus.git
    cd counselling-system
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    Create a `.env` file in the root and add your Gemini API Key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```
4.  **Run locally**:
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure
```text
counselling-system/
├── src/
│   ├── components/     # Reusable UI components (Student/Admin specific)
│   ├── pages/          # Main application views (Dashboard, AI Counsellor, etc.)
│   ├── utils/          # AI logic, OCR helpers, and API configurations
│   ├── assets/         # Static images and icons
│   └── App.jsx         # Main routing and application logic
├── public/             # Public assets and configuration
└── tailwind.config.js  # Custom design tokens and theme settings
```

---


**Developed with ❤️ for Rank2Campus**
