'use client';

import { useEffect, useState } from 'react';

// Decode base64 body content
function decodeBase64(base64) {
  try {
    return atob(base64);
  } catch (err) {
    return '[Error decoding body]';
  }
}

// Decode HTML entities like &amp;, &lt;, etc.
function decodeHTMLEntities(text) {
  const txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value;
}

export default function Summary() {
  const [emailData, setEmailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:8000/api/last-result");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("📨 Received summary from backend:", data);

        setEmailData(data);
      } catch (err) {
        console.error("❌ Error fetching summary:", err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
    const interval = setInterval(fetchSummary, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading email summary...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!emailData || !emailData.inbox?.length) return <p>No email summary available.</p>;

  const { from, subject, body } = emailData.inbox[0];
  const summaryText = decodeHTMLEntities(emailData.summary?.trim() || 'No summary provided.');
  const decodedBody = decodeHTMLEntities(decodeBase64(body));

  return (
    <div className="p-4 border rounded shadow bg-white space-y-4">
      <h2 className="text-lg font-semibold">📬 Latest Email Summary</h2>

      <div className="text-sm text-gray-800">
        <p><strong>From:</strong> {from}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Summary:</strong> {summaryText}</p>

        {emailData.action && (
          <p><strong>Action:</strong> {emailData.action}</p>
        )}
        {emailData.reasoning && (
          <p><strong>Reasoning:</strong> {emailData.reasoning}</p>
        )}
        {emailData.calendar_event && (
          <p><strong>Calendar Info:</strong> {emailData.calendar_event}</p>
        )}
      </div>

      <details className="text-sm mt-2">
        <summary className="cursor-pointer text-blue-600 underline">View Full Email Body</summary>
        <pre className="whitespace-pre-wrap mt-2 text-gray-700">{decodedBody}</pre>
      </details>
    </div>
  );
}
