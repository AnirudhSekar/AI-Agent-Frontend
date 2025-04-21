// components/AgentLog.js
"use client";

export default function AgentLog({ log }) {
  return (
    <div className="mb-6 bg-gray-50 border border-gray-200 p-4 rounded">
      <h2 className="text-xl font-semibold mb-2">📓 Agent Reasoning Log</h2>
      <pre className="whitespace-pre-wrap text-sm text-gray-700">{log || "No logs yet."}</pre>
    </div>
  );
}
