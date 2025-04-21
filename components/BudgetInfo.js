// components/BudgetInfo.js
"use client";

export default function BudgetInfo({ info }) {
  return (
    <div className="mb-6 bg-yellow-50 border border-yellow-200 p-4 rounded">
      <h2 className="text-xl font-semibold mb-2">💰 Budget Info</h2>
      <p className="text-gray-800">{info || "No budget data found."}</p>
    </div>
  );
}
