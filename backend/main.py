from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai

# --- CONFIGURATION ---
# Replace with your actual Gemini API Key from Google AI Studio
genai.configure(api_key="AIzaSyDGGvvpg1rvikybwmFmMVt7EX-2Ajk1Cgg")
model = genai.GenerativeModel('gemini-2.5-flash')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

SYSTEM_PROMPT = """
You are 'Pathfinder', a Skill Gap Diagnostic Tool. 
Your goal is to find missing prerequisites in a user's knowledge.
1. Ask 1-2 diagnostic questions.
2. Identify a specific 'Weak Conceptual Link'.
3. Explain why this gap prevents them from reaching their advanced goal.
"""

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        # Combining system prompt with user message for Gemini
        full_prompt = f"{SYSTEM_PROMPT}\n\nUser Message: {req.message}"
        response = model.generate_content(full_prompt)
        return {"reply": response.text}
    except Exception as e:
        return {"reply": f"Gemini Error: {str(e)}"}