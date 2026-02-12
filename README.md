Pathfinder: Skill Gap Diagnostic Tool

Pathfinder is an AI-driven educational platform that identifies hidden knowledge gaps. Unlike traditional learning roadmaps, Pathfinder uses a Socratic diagnostic engine to ensure learners have the necessary prerequisites before tackling advanced technical topics.

 The Vision

In the era of information overload, learners often suffer from "Tutorial Hell"—building on shaky foundations without realizing it. Pathfinder bridges this gap by:

* Diagnosing current knowledge through strategic questioning.
* Identifying "Weak Conceptual Links" that hinder advanced progress.
* Unfolding a personalized learning path based on real-time feedback.

Tech Stack

* Frontend: React (Vite) with Tailwind CSS for a responsive, modern UI.
* Backend: FastAPI (Python) for high-performance asynchronous logic.
* AI Engine: Google Gemini 1.5 Flash for near-instant, intelligent diagnostics.
* Communication: RESTful API with CORS middleware for secure frontend-backend integration.
 Setup & Installation

### 1. Backend Setup

```powershell
cd backend
pip install -r requirements.txt
# Ensure your Gemini API Key is configured in main.py
fastapi dev main.py

```

### 2. Frontend Setup

```powershell
cd frontend
npm install
npm run dev

```

Key Features

* Socratic Interrogator: Instead of giving answers, the AI asks targeted questions to prove competency.
* Gap Visualization: Identifies exactly which prerequisite (e.g., "Timing Analysis" for VLSI) is missing.
* Lightning Fast: Leveraging Gemini 1.5 Flash for sub-second response times.
