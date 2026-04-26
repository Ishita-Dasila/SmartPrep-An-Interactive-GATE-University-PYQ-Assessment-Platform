# SmartPrep: An Interactive GATE & University PYQ Assessment Platform

## Project Overview

SmartPrep is a full-stack web application designed to transform static previous year question (PYQ) papers into an interactive learning system. In the traditional method, students depend on unorganized PDF files from sources like Google Drive, which makes it difficult to practice effectively, evaluate answers, and track progress. SmartPrep solves this by providing a structured platform where students can practice university PYQs and GATE questions in a more interactive and organized way.

The platform combines MCQ practice, descriptive answer writing, programming question solving, AI-based explanations, YouTube video recommendations, and progress tracking into a single unified system, making exam preparation more structured, effective, and easy to follow.

---

## Repository

https://github.com/Ishita-Dasila/SmartPrep-An-Interactive-GATE-University-PYQ-Assessment-Platform

---

## Features

- GATE MCQ quiz system with timed tests, subject-wise filtering, random question generation, navigation, and automatic scoring
- University PYQ descriptive practice with PDF viewer and keyword-based answer evaluation
- Programming question bank for DSA practice with topic and difficulty filtering
- AI-based explanations for MCQs and programming problems using the Groq API
- YouTube video recommendations for visual learning support
- Progress tracking dashboard with score trends, weak topics, daily streaks, and practice history
- Secure user authentication with login, registration, and session management
- Keyword-based evaluation highlighting matched and missing concepts with partial marking

---

## System Architecture

The system follows a clean client-server architecture:

- The frontend is developed using HTML, CSS, and JavaScript. It communicates with the backend through the fetch() API for smooth asynchronous data exchange without page reloads.
- The backend is developed using Node.js with Express.js. It handles user authentication, stores user progress and history, processes evaluation logic, and manages AI-related requests via the Groq API.
- All academic content including MCQ questions, PYQ papers, programming questions, and evaluation keywords is stored in structured JSON files, making the system flexible and easy to update.
- A CSV-based syllabus keyword dataset is used as the master reference for descriptive evaluation across different subjects and units.

---

## Modules

### GATE MCQ Quiz System

Students can attempt timed multiple-choice questions in an environment similar to real exams. The system includes subject-wise filtering, random question generation, a question navigation panel, and automatic scoring for correct, wrong, and skipped answers. A streak counter encourages consistent daily practice. After submission, the system displays a detailed result with per-question review and AI-based explanations for correct answers.

### University PYQ Descriptive Practice

Students can view previous year question papers in PDF format directly inside the platform. They write answers in a text input area, and the system evaluates responses using a keyword-based assessment approach. Partial marks are awarded based on how many important keywords are included. Correctly matched keywords are highlighted, and missing keywords are shown to help students understand where their answers fell short and how to improve.

### Programming Question Bank

Students can practice DSA and coding questions stored in a structured format. Questions can be filtered by topic and difficulty level. For each question, the system provides AI-generated step-by-step solutions, code output, and time complexity analysis using the Groq API. A YouTube video suggestion feature recommends relevant videos based on the selected topic to support visual learning.

### Dashboard

The dashboard tracks user performance across all modules. It displays overall score trends using charts, subject-wise best and average scores, tests attempted, weak topic identification by unit, daily streak tracking, and AI feedback on areas needing improvement. All data updates dynamically based on user activity.

### AI Assistant

The AI assistant is powered by the Groq API through a Node.js and Express backend. It explains the reasoning behind MCQ answers in simple language, provides step-by-step programming solutions, and supports general concept understanding within the platform.

---

## Database Schema (ER Model)

### Entities and Key Attributes

**USER** - name, email, password_hash, created_at, user_id (PK)

**GATE_QUIZ_ATTEMPT** - date, topic, score, total_questions, time_taken_seconds, streak_count, attempt_id (PK)

**PYQ_ATTEMPT** - student_answer, matched_keywords, keywords_total, score, total_marks, paper_type, date, attempt_id (PK)

**GATE_QUESTION** - question_text, option_a, option_b, option_c, option_d, correct_answer, topic, question_id (PK)

**PAPER** - year, semester, branch, paper_type, file_path, paper_id (PK)

**SUBJECT** - subject_name, branch, semester, subject_code (PK)

**KEYWORD** - keyword_text, keyword_id (PK), subject_code (FK)

### Relationships

- A USER takes many GATE_QUIZ_ATTEMPTs
- A USER submits many PYQ_ATTEMPTs
- A GATE_QUIZ_ATTEMPT answers many GATE_QUESTIONs
- A PYQ_ATTEMPT is for one PAPER
- A GATE_QUESTION belongs to one SUBJECT
- A PAPER covers one SUBJECT
- A SUBJECT has many KEYWORDs

---

## Project Structure

```
SmartPrep/
|
|-- samplefront.html                        # Home / landing page with sidebar navigation
|-- samplelogin.html                        # Login page with session handling
|-- sampleregister.html                     # Registration page with input validation
|-- samplethankyou.html                     # Confirmation page after successful registration
|-- samplegatequiz.html                     # GATE MCQ quiz interface with timer and AI agent
|-- descriptive.html                        # PYQ descriptive practice with PDF viewer and evaluation
|-- sampledashboard.html                    # Performance analytics dashboard
|-- questionsbank.html                      # Programming question bank with AI and YouTube support
|
|-- server.js                               # Node.js Express backend with Groq API integration
|
|-- questions.json                          # GATE MCQ question bank organized by subject
|-- keywords.json                           # Subject-wise keyword lists for all branches
|-- papers.json                             # Metadata of all university PYQ PDFs
|-- programming_questions.json              # DSA programming questions with topic and difficulty
|-- GEU_All_Branches_Syllabus_Keywords.csv  # Master keyword dataset from GEU syllabus
|
|-- README.md                               # Project documentation
```

---

## How to Run

### Prerequisites

- Node.js and npm
- A valid Groq API key
- A modern web browser

### Running the Backend

1. Install dependencies:

```bash
npm install
```

2. Add your Groq API key to the server configuration or environment variables.

3. Start the backend server:

```bash
node server.js
```

### Opening the Application

Open `samplefront.html` in a browser or serve the project through the Node.js server. Navigate through the platform using the sidebar. Register a new account or log in with existing credentials to access all modules.

---

## Data Files

**questions.json** - Stores all GATE MCQ questions with subject label, question text, four options (A, B, C, D), and the correct answer. Used by the quiz engine for random and subject-wise selection.

**keywords.json** - Contains curated keyword lists for every subject, branch, and unit of the GEU syllabus. Used by the descriptive evaluation system to match student answers and award partial marks.

**papers.json** - Stores metadata for all available university PYQ PDF files, including year, semester, branch, paper type, and the file path for serving the PDF in the viewer.

**programming_questions.json** - Contains DSA coding questions with title, problem statement, difficulty level, and topic tag. Used by the programming question bank for filtering and display.

**GEU_All_Branches_Syllabus_Keywords.csv** - The master reference file containing syllabus keywords extracted from the official GEU curriculum, covering all branches and semesters. Used as the primary source for building keywords.json.

---

## Tasks Completed

| Task | Team Member |
|---|---|
| Home Page (samplefront.html) | Ishita Dasila |
| Login Page (samplelogin.html) | Ishita Dasila |
| Register Page (sampleregister.html) | Ishita Dasila |
| Thank You Page (samplethankyou.html) | Ishita Dasila |
| GATE Quiz Page (samplegatequiz.html) | Ishita Dasila |
| Descriptive Practice Page (descriptive.html) | Ishita Dasila, Khushi Bhati |
| Dashboard Page (sampledashboard.html) | Khushi Bhati, Tejas Bahl |
| Programming Question Bank (questionsbank.html) | Khushi Bhati, Tejas Bahl |
| keywords.json | Ishita Dasila, Khushi Bhati, Tejas Bahl |
| questions.json | Ishita Dasila, Khushi Bhati, Tejas Bahl |
| papers.json | Ishita Dasila, Khushi Bhati, Tejas Bahl |
| programming_questions.json | Ishita Dasila, Khushi Bhati, Tejas Bahl |
| GEU_All_Branches_Syllabus_Keywords.csv | Ishita Dasila, Khushi Bhati, Tejas Bahl |

---

## Challenges Faced and Solutions

**Keyword dataset creation:** Building and organizing keyword datasets across multiple subjects, branches, and units was time-consuming. The work was divided among team members by branch, using the official GEU syllabus as the primary reference.

**PDF integration:** PDFs were not displaying correctly inside the application due to browser restrictions and file access issues. This was fixed by serving all PDF files through the backend server using controlled routes.

**Keyword-based evaluation accuracy:** Early versions of the evaluation system sometimes gave inconsistent results with long technical phrases. This was improved by introducing a structured matching approach with a threshold-based scoring system to ensure fair and reliable evaluation.

**Frontend and backend integration:** Connecting the UI with backend APIs required careful debugging across all modules. Static JSON data was gradually replaced with dynamic API responses from the Node.js backend.

**Large JSON dataset management:** As datasets grew, maintaining performance and avoiding data loading issues became important. Proper structuring and consistent formatting were enforced across all data files.

**GATE quiz logic:** Handling timer logic, random question selection, subject-wise filtering, and navigation simultaneously required multiple rounds of debugging to ensure a smooth user experience.

**AI response handling:** Integrating AI-generated explanations and formatting code output from the Groq API required careful handling of asynchronous responses and proper rendering on the frontend.

**Dashboard data aggregation:** Combining data from quiz, descriptive, and programming modules into a unified dashboard required multiple iterations to ensure consistent performance tracking and correct storage of user history.

---

## Testing and Validation

| Test Type | Status | Notes |
|---|---|---|
| UI and Navigation | Pass | All pages, sidebar, and navigation flow work smoothly across browsers |
| Login System | Pass | Login, registration, and redirection work correctly with proper session handling |
| GATE Quiz | Pass | Random selection, subject filtering, timer, scoring, navigation, and streak tracking all functional |
| Descriptive Evaluation | Pass | Keyword matching works accurately with feedback highlighting correct and missing concepts |
| PDF Viewer | Pass | PYQ PDF papers load correctly without errors |
| Programming Question Bank | Pass | Topic and difficulty filtering, AI solutions, code display, and YouTube recommendations all work |
| Dashboard and Data | Pass | Score tracking, progress charts, streaks, weak topics, and learning trends display correctly |
| Unit Visibility | Pass | Unit numbers display correctly alongside weak subject names |
| AI Agent | Pass | Groq API integration works correctly for MCQ and programming explanations |
| Dataset Management | Pass | JSON and CSV files are properly structured and load efficiently |
| Backend Integration | Pass | Node.js/Express backend handles authentication, AI requests, history storage, and evaluation |
| API Communication | Pass | Frontend and backend communication using fetch() works without delays or errors |
| Performance and Stability | Pass | System runs smoothly with large datasets and stable navigation across all modules |

---

## Future Scope

- Add support for more branches and semesters in the keyword and PYQ dataset
- Introduce a leaderboard for competitive ranking among users
- Add a spaced repetition system for weak topic revision
- Enable offline mode with cached question banks
- Support code execution directly in the browser for programming questions
- Extend AI assistant to support doubt clearing through conversational follow-up questions
- Add email-based notifications for daily practice reminders and streak alerts
- Introduce admin panel for managing question banks and PYQ uploads

---

## License

This project was developed as part of the Full Stack Development course at Graphic Era (Deemed to be) University, Dehradun, by the CodeCrafters team (FS-VI-T162).
