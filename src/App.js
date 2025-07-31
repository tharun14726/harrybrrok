import axios from 'axios';
import { useState } from 'react';

function App() {
  const [file, setFile] = useState("");
  const [msg, setMsg] = useState("");
  const [pdfURL, setPdfURL] = useState("");
  const [question, setQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  async function handleUpload() {
    const formData = new FormData();
    formData.append("document", file);
    try {
      await axios.post('http://localhost:5000/upload', formData);
      setMsg('✅ File uploaded successfully');
      setPdfURL(`http://localhost:5000/uploads/${file.name}`);
    } catch {
      setMsg('❌ An error occurred');
    }
  }

  async function askQuestion() {
    try {
      const res = await axios.post('http://localhost:5000/ask', { question });
      setChatResponse(res.data.result);
    } catch {
      setChatResponse(" Failed to get response");
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>📁 File Upload + AI Chat</h1>
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        accept="application/pdf"
      />
      <br />
      <button onClick={handleUpload}>Upload</button>
      <p>{msg}</p>

      {pdfURL && (
        <div style={{ marginTop: '20px' }}>
          <h3>📄 PDF Preview</h3>
          <iframe
            src={pdfURL}
            width="70%"
            height="500px"
            title="pdf-preview"
            style={{ border: "1px solid #ccc" }}
          ></iframe>
        </div>
      )}

      {pdfURL && (
        <div style={{ marginTop: '30px' }}>
          <h3>💬 Ask Question About PDF</h3>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about the document"
          />
          <button onClick={askQuestion}>Ask</button>
          <p><strong>AI:</strong> {chatResponse}</p>
        </div>
      )}
    </div>
  );
}

export default App;
