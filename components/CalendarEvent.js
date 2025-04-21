// components/CalendarEvent.js
"use client";

export default function CalendarEvent({ event }) {
  return (
    <div className="mb-6 bg-purple-50 border border-purple-200 p-4 rounded">
      <h2 className="text-xl font-semibold mb-2">📅 Calendar Suggestion</h2>
      <p className="text-gray-800">{event || "No calendar event generated."}</p>
    </div>
  );
}
