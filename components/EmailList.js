// components/EmailList.js
"use client";

export default function EmailList({ emails = [] }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">📨 Inbox</h2>
      <ul className="space-y-3">
        {emails.map((email, index) => (
          <li key={index} className="border rounded p-4 bg-white shadow-sm">
            <p className="font-medium">From: {email.from}</p>
            <p className="text-sm text-gray-600">Subject: {email.subject}</p>
            <p className="text-gray-800 mt-1">{email.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
