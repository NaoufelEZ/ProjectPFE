import React, { useState } from "react";
import axios from "axios";

const Recommendations = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function sendMessage() {
    if (!input) {
      setResponse("Please enter a message.");
      return;
    }

    setResponse("Loading...");

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            Authorization: `Bearer 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`, // Store securely!
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(res.data.choices[0].message.content || "No response received.");
    } catch (error) {
      console.error(error);
      setResponse("Error fetching response.");
    }
  }

  return (
    <div>
      <h2>Recommended Products</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send</button>
      <p>{response}</p>
    </div>
  );
};

export default Recommendations;
