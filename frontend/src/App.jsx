import { useState } from 'react'

function App() {
  const [messages, setMessages] = useState([{ role: "ai", content: "Hi! I'm Pathfinder. What learning goal can I help you diagnose today?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // FORCE the URL to point to the backend port 8000
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "ai", content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "ai", content: "Error: Could not reach the Pathfinder Brain. Make sure the black terminal window (Backend) is running!" }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-4 font-sans">
      <header className="bg-blue-600 text-white p-4 rounded-t-lg shadow">
        <h1 className="text-2xl font-bold">Pathfinder</h1>
        <p className="text-sm">Personalized Skill Gap Self-Diagnosis Tool</p>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 bg-white border-x shadow-inner">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-3 rounded-lg max-w-[80%] ${msg.role === "user" ? "bg-blue-100 text-blue-900" : "bg-white border border-gray-200 text-gray-800 shadow-sm"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-gray-500 italic ml-2">Pathfinder is analyzing your skill gaps...</div>}
      </main>

      <footer className="p-4 bg-white border-x border-b rounded-b-lg shadow flex gap-2">
        <input 
          type="text" 
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send</button>
      </footer>
    </div>
  )
}

export default App