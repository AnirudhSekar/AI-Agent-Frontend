// lib/api.js

export async function fetchAgentState() {
    const res = await fetch("/api/state"); // Adjust path based on your backend
    return res.json();
  }
  