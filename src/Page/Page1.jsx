import React, { useState } from "react";

const EmailForm = () => {
  const [senderHead, setSenderHead] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const encodedSenderHead = encodeURIComponent(senderHead);
      const encodedSenderEmail = encodeURIComponent(senderEmail);
      const encodedMessage = encodeURIComponent(message);

      const response = await fetch(
        `http://10.17.77.189:3000/send-email?senderHead=${encodedSenderHead}&senderEmail=${encodedSenderEmail}&message=${encodedMessage}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setResponse(data.message);
    } catch (error) {
      console.error("Error sending email:", error);
      setResponse("Failed to send email");
    }
  };

  return (
    <div>
      <h1>Email Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="senderHead">Head:</label>
          <input
            type="text"
            id="senderHead"
            value={senderHead}
            onChange={(e) => setSenderHead(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="senderEmail">Recipient Emails:</label>
          <input
            type="text"
            id="senderEmail"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
          />
          <p>Separate multiple emails with commas (,)</p>
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Send Email</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default EmailForm;
