'use client';

import { useEffect, useState } from 'react';

// Basic HTML entity decoder (just in case backend missed something)
function decodeHTMLEntities(text) {
  const txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value;
}

export default function AgentReply() {
  const [replyData, setReplyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReply = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/last-result');
        if (!res.ok) throw new Error('Failed to fetch latest reply');

        const data = await res.json();
        console.log("📬 Raw response from backend:", JSON.stringify(data, null, 2));

        if (!data.inbox || !Array.isArray(data.inbox) || data.inbox.length === 0) {
          throw new Error('No emails found in inbox');
        }

        const latestEmail = data.inbox[0];

        const rawReply = data.reply || latestEmail.reply || 'No reply generated yet.';
        const replyText = decodeHTMLEntities(rawReply);

        const recipientEmail = latestEmail.from || 'Unknown User';
        const recipientName = recipientEmail.includes('@')
          ? recipientEmail.split('@')[0]
          : recipientEmail;

        setReplyData({
          to: recipientEmail,
          subject: decodeHTMLEntities(latestEmail.subject || 'No Subject'),
          reply: replyText,
          recipientName,
        });
      } catch (err) {
        console.error("❌ Error fetching reply:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReply();
    const interval = setInterval(fetchReply, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-6 bg-green-50 border border-green-200 p-4 rounded">
      <h2 className="text-xl font-semibold mb-2">✉️ Suggested Reply</h2>
      {loading ? (
        <p>Loading reply...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : replyData ? (
        <div>
          
          <pre className="whitespace-pre-wrap text-gray-700 mt-2">
            {replyData.reply}
          </pre>
        </div>
      ) : (
        <p>No reply generated yet.</p>
      )}
    </div>
  );
}
